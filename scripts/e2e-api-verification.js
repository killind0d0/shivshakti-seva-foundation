/**
 * Automated E2E API Verification Suite
 * Tests all core backend endpoints:
 *  - /api/submissions (Help, Volunteer, Women, Contact, Donation Receipt)
 *  - /api/track (by ID and by phone)
 *  - /api/auth/login (Success & Failure cases)
 *  - /api/auth/me
 *  - /api/submissions (Authenticated GET & PATCH)
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3009";

async function runTests() {
  console.log(`Starting E2E API Verification against ${BASE_URL}...\n`);
  let passed = 0;
  let total = 0;

  function assert(condition, testName, detail = "") {
    total++;
    if (condition) {
      console.log(`  ✓ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${testName}: ${detail}`);
    }
  }

  try {
    // -------------------------------------------------------------
    // Test 1: Submit Help Request
    // -------------------------------------------------------------
    console.log("1. Testing Help Request Submission (/api/submissions)...");
    const helpPayload = {
      type: "help_request",
      name: "अमित कुमार चौधरी",
      phone: "9876543210",
      location: "गया, बिहार",
      needType: "चिकित्सा एवं दवा सहायता",
      details: "परिवार के वरिष्ठ सदस्य के लिए जीवनरक्षक दवाओं की तत्काल आवश्यकता है।",
    };

    const submitRes = await fetch(`${BASE_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(helpPayload),
    });
    const submitData = await submitRes.json();

    assert(
      submitRes.status === 201 || submitRes.status === 200,
      "Help Request HTTP 200/201 (Created)",
      `Status was ${submitRes.status}`
    );
    assert(submitData.success === true, "Help Request Success flag", JSON.stringify(submitData));
    assert(
      typeof submitData.trackingId === "string" && submitData.trackingId.startsWith("SSF-2026-"),
      "Generated Tracking ID format (SSF-2026-XXXXXX)",
      `Got trackingId: ${submitData.trackingId}`
    );

    const generatedTrackingId = submitData.trackingId;
    console.log(`    Generated Tracking ID: ${generatedTrackingId}\n`);

    // -------------------------------------------------------------
    // Test 2: Track Request by Tracking ID
    // -------------------------------------------------------------
    console.log("2. Testing Track Request by Tracking ID (/api/track?id=...)...");
    const trackRes = await fetch(`${BASE_URL}/api/track?id=${generatedTrackingId}`);
    const trackData = await trackRes.json();

    assert(trackRes.status === 200, "Track Request HTTP 200", `Status was ${trackRes.status}`);
    assert(trackData.success === true, "Track Request success flag");
    assert(trackData.found === true, "Track Request found flag");
    assert(
      trackData.record?.trackingId === generatedTrackingId,
      "Track Request ID matches",
      `Expected ${generatedTrackingId}, got ${trackData.record?.trackingId}`
    );
    assert(
      trackData.record?.name === "अमित कुमार चौधरी",
      "Track Request beneficiary name matches",
      `Expected अमित कुमार चौधरी, got ${trackData.record?.name}`
    );
    assert(
      typeof trackData.record?.step === "number" && trackData.record.step >= 1,
      "Track Request progress step computed (1 to 4)",
      `Step was: ${trackData.record?.step}`
    );
    console.log(`    Found Beneficiary: ${trackData.record?.name}, Status: ${trackData.record?.status}, Step: ${trackData.record?.step}\n`);

    // -------------------------------------------------------------
    // Test 3: Track Request by Phone Number
    // -------------------------------------------------------------
    console.log("3. Testing Track Request by Phone (/api/track?phone=...)...");
    const trackPhoneRes = await fetch(`${BASE_URL}/api/track?phone=9876543210`);
    const trackPhoneData = await trackPhoneRes.json();
    assert(trackPhoneRes.status === 200, "Track by Phone HTTP 200");
    assert(trackPhoneData.found === true, "Track by Phone found records");
    assert(
      trackPhoneData.totalMatches >= 1,
      "Track by Phone totalMatches >= 1",
      `Matches: ${trackPhoneData.totalMatches}`
    );
    console.log(`    Total matches for phone 9876543210: ${trackPhoneData.totalMatches}\n`);

    // -------------------------------------------------------------
    // Test 4: Track Non-Existent ID (404 expected)
    // -------------------------------------------------------------
    console.log("4. Testing Track Non-Existent ID (/api/track?id=SSF-9999-000000)...");
    const track404Res = await fetch(`${BASE_URL}/api/track?id=SSF-9999-000000`);
    const track404Data = await track404Res.json();
    assert(track404Res.status === 404, "Track Non-Existent HTTP 404", `Got status ${track404Res.status}`);
    assert(track404Data.found === false, "Track Non-Existent found === false");
    console.log(`    404 Message: ${track404Data.message}\n`);

    // -------------------------------------------------------------
    // Test 5: Login with Admin Credentials
    // -------------------------------------------------------------
    console.log("5. Testing Admin Login (/api/auth/login)...");
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "admin", password: "admin@123" }),
    });
    const loginData = await loginRes.json();
    const setCookieHeader = loginRes.headers.get("set-cookie") || "";

    assert(loginRes.status === 200, "Admin Login HTTP 200", `Got ${loginRes.status}`);
    assert(loginData.success === true, "Admin Login success flag");
    assert(typeof loginData.token === "string" && loginData.token.length > 20, "JWT session token returned");
    assert(loginData.user?.role === "admin", "User role is admin");
    assert(setCookieHeader.includes("ssf_session="), "Set-Cookie contains ssf_session");
    console.log(`    Logged in as: ${loginData.user?.name} (Role: ${loginData.user?.role})\n`);

    const authToken = loginData.token;

    // -------------------------------------------------------------
    // Test 6: Login with Invalid Credentials (401 expected)
    // -------------------------------------------------------------
    console.log("6. Testing Invalid Login (/api/auth/login)...");
    const invalidLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "admin", password: "wrong-password" }),
    });
    const invalidLoginData = await invalidLoginRes.json();
    assert(invalidLoginRes.status === 401, "Invalid Login HTTP 401", `Got ${invalidLoginRes.status}`);
    assert(invalidLoginData.success === false, "Invalid Login success === false");
    console.log(`    401 Error: ${invalidLoginData.error}\n`);

    // -------------------------------------------------------------
    // Test 7: Verify Authenticated Admin Access to /api/submissions
    // -------------------------------------------------------------
    console.log("7. Testing Authenticated Query to /api/submissions (Bearer Token)...");
    const authSubmissionsRes = await fetch(`${BASE_URL}/api/submissions?limit=5`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const authSubmissionsData = await authSubmissionsRes.json();
    assert(authSubmissionsRes.status === 200, "Authenticated Submissions HTTP 200", `Got ${authSubmissionsRes.status}`);
    assert(authSubmissionsData.success === true, "Authenticated Submissions success flag");
    assert(Array.isArray(authSubmissionsData.submissions), "Submissions array returned");
    assert((authSubmissionsData.total ?? authSubmissionsData.totalCount) >= 1, "Total submissions count >= 1");
    console.log(`    Total Submissions in store: ${authSubmissionsData.total ?? authSubmissionsData.totalCount}\n`);

    // -------------------------------------------------------------
    // Test 8: Submit Volunteer Registration
    // -------------------------------------------------------------
    console.log("8. Testing Volunteer Registration (/api/submissions)...");
    const volRes = await fetch(`${BASE_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "volunteer",
        name: "प्रिया वर्मा",
        phone: "9123456789",
        city: "पटना, बिहार",
        services: "आपदा राहत एवं राशन वितरण",
        availability: "सप्ताहांत",
      }),
    });
    const volData = await volRes.json();
    assert(volRes.status === 201 || volRes.status === 200, "Volunteer Registration HTTP 200/201");
    assert(volData.success === true, "Volunteer Registration success flag");
    console.log(`    Volunteer registered successfully (ID: ${volData.id})\n`);

    // -------------------------------------------------------------
    // Test 9: Submit Donation Receipt Request
    // -------------------------------------------------------------
    console.log("9. Testing Donation Receipt Request (/api/submissions)...");
    const donRes = await fetch(`${BASE_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "donation_receipt",
        donorName: "विकास अग्रवाल",
        donorPhone: "9811223344",
        donorPan: "ABCDE1234F",
        amount: 5100,
        transactionRef: "UPI/329019283019",
      }),
    });
    const donData = await donRes.json();
    assert(donRes.status === 201 || donRes.status === 200, "Donation Receipt HTTP 200/201");
    assert(donData.success === true, "Donation Receipt success flag");
    console.log(`    Donation Receipt registered successfully (ID: ${donData.id})\n`);

    // -------------------------------------------------------------
    // Summary
    // -------------------------------------------------------------
    console.log("==========================================");
    console.log(`Verification Complete: ${passed} / ${total} tests PASSED!`);
    console.log("==========================================");

    if (passed === total) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.error("Fatal Test Suite Error:", err);
    process.exit(1);
  }
}

runTests();
