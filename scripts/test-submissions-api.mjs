import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3005";

async function runTests() {
  console.log("=== STARTING SUBMISSIONS & TRACKING API INTEGRATION TESTS ===");
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // ----------------------------------------------------
    // TEST 1: POST help_request (Valid)
    // ----------------------------------------------------
    console.log("\n[Test 1] POST /api/submissions (help_request)");
    const helpPayload = {
      type: "help_request",
      name: "दिनेश कुमार सिंह",
      phone: "9812345678",
      location: "गया जी, अनुग्रह नारायण रोड",
      needType: "राशन एवं आपातकालीन राहत",
      details: "बाढ़ प्रभावित परिवार को राशन किट की आवश्यकता है।",
    };
    const res1 = await fetch(`${BASE_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(helpPayload),
    });
    const data1 = await res1.json();
    assert(res1.status === 201, `Status is 201 (got ${res1.status})`);
    assert(data1.success === true, `data.success is true`);
    assert(typeof data1.trackingId === "string" && data1.trackingId.startsWith("SSF-2026-"), `Generated valid trackingId (${data1.trackingId})`);
    assert(data1.submission && data1.submission.name === "दिनेश कुमार सिंह", `Record contains correct name`);
    const createdTrackingId = data1.trackingId;

    // ----------------------------------------------------
    // TEST 2: POST with missing required fields (Name missing)
    // ----------------------------------------------------
    console.log("\n[Test 2] POST /api/submissions (Missing Name)");
    const res2 = await fetch(`${BASE_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "help_request",
        phone: "9812345678",
        location: "बोधगया",
      }),
    });
    const data2 = await res2.json();
    assert(res2.status === 400, `Status is 400 (got ${res2.status})`);
    assert(data2.success === false, `data.success is false`);
    assert(Array.isArray(data2.errors) && data2.errors.length > 0, `Returns validation errors array`);

    // ----------------------------------------------------
    // TEST 3: POST with invalid phone (< 10 digits)
    // ----------------------------------------------------
    console.log("\n[Test 3] POST /api/submissions (Invalid Phone)");
    const res3 = await fetch(`${BASE_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "volunteer",
        name: "अजय कुमार",
        phone: "12345",
        city: "गया",
      }),
    });
    const data3 = await res3.json();
    assert(res3.status === 400, `Status is 400 (got ${res3.status})`);
    assert(data3.success === false, `data.success is false`);

    // ----------------------------------------------------
    // TEST 4: POST volunteer
    // ----------------------------------------------------
    console.log("\n[Test 4] POST /api/submissions (volunteer)");
    const volPayload = {
      type: "volunteer",
      name: "विकास कुमार",
      mobile: "9934123456",
      city: "बोधगया",
      profession: "शिक्षक",
      services: ["शिक्षा एवं बाल संस्कार"],
    };
    const res4 = await fetch(`${BASE_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(volPayload),
    });
    const data4 = await res4.json();
    assert(res4.status === 201, `Status is 201 (got ${res4.status})`);
    assert(data4.success === true, `data.success is true`);
    assert(data4.submission.type === "volunteer", `Type is volunteer`);

    // ----------------------------------------------------
    // TEST 5: POST women_competition
    // ----------------------------------------------------
    console.log("\n[Test 5] POST /api/submissions (women_competition)");
    const womenPayload = {
      type: "women_competition",
      name: "सुनीता देवी",
      phone: "9431234567",
      address: "गांधी मैदान के पास, गया",
      skillCategory: "सिलाई एवं परिधान निर्माण",
      experienceYears: "प्रशिक्षित (०-१ वर्ष)",
    };
    const res5 = await fetch(`${BASE_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(womenPayload),
    });
    const data5 = await res5.json();
    assert(res5.status === 201, `Status is 201 (got ${res5.status})`);
    assert(data5.success === true, `data.success is true`);

    // ----------------------------------------------------
    // TEST 6: POST contact
    // ----------------------------------------------------
    console.log("\n[Test 6] POST /api/submissions (contact)");
    const contactPayload = {
      type: "contact",
      name: "राजेश वर्मा",
      phone: "9871123456",
      subject: "सहयोग संबंधी प्रश्न",
      message: "फाउंडेशन के कार्यों में सहयोग करना चाहते हैं।",
    };
    const res6 = await fetch(`${BASE_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactPayload),
    });
    const data6 = await res6.json();
    assert(res6.status === 201, `Status is 201 (got ${res6.status})`);
    assert(data6.success === true, `data.success is true`);

    // ----------------------------------------------------
    // TEST 7: POST donation_receipt
    // ----------------------------------------------------
    console.log("\n[Test 7] POST /api/submissions (donation_receipt)");
    const donationPayload = {
      type: "donation_receipt",
      donorName: "अमित शर्मा",
      donorPhone: "9811223344",
      amount: 2100,
      transactionRef: "UPI/321876543210",
      notes: "राशन किट सहयोग",
    };
    const res7 = await fetch(`${BASE_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationPayload),
    });
    const data7 = await res7.json();
    assert(res7.status === 201, `Status is 201 (got ${res7.status})`);
    assert(data7.success === true, `data.success is true`);

    // ----------------------------------------------------
    // TEST 8: GET /api/submissions without Auth
    // ----------------------------------------------------
    console.log("\n[Test 8] GET /api/submissions (Unauthorized)");
    const res8 = await fetch(`${BASE_URL}/api/submissions`);
    const data8 = await res8.json();
    assert(res8.status === 401, `Status is 401 (got ${res8.status})`);
    assert(data8.success === false, `data.success is false for unauthenticated request`);

    // ----------------------------------------------------
    // TEST 9: GET /api/submissions with Auth (Bearer token)
    // ----------------------------------------------------
    console.log("\n[Test 9] GET /api/submissions (Authorized with Bearer token)");
    const res9 = await fetch(`${BASE_URL}/api/submissions`, {
      headers: { Authorization: "Bearer admin@123" },
    });
    const data9 = await res9.json();
    assert(res9.status === 200, `Status is 200 (got ${res9.status})`);
    assert(data9.success === true, `data.success is true`);
    assert(Array.isArray(data9.submissions), `Returns submissions array`);
    assert(data9.submissions.length >= 6, `Total records >= 6 (got ${data9.submissions.length})`);

    // ----------------------------------------------------
    // TEST 10: GET /api/submissions?category=volunteer (Filtered)
    // ----------------------------------------------------
    console.log("\n[Test 10] GET /api/submissions?category=volunteer (Filtered)");
    const res10 = await fetch(`${BASE_URL}/api/submissions?category=volunteer`, {
      headers: { Authorization: "Bearer ssf2026" },
    });
    const data10 = await res10.json();
    assert(res10.status === 200, `Status is 200 (got ${res10.status})`);
    assert(data10.category === "volunteer", `Category is volunteer`);
    assert(data10.submissions.every((s) => s.type === "volunteer"), `All returned records are volunteers`);

    // ----------------------------------------------------
    // TEST 11: GET /api/track without query params
    // ----------------------------------------------------
    console.log("\n[Test 11] GET /api/track (Missing params)");
    const res11 = await fetch(`${BASE_URL}/api/track`);
    const data11 = await res11.json();
    assert(res11.status === 400, `Status is 400 (got ${res11.status})`);
    assert(data11.found === false, `data.found is false`);

    // ----------------------------------------------------
    // TEST 12: GET /api/track with Seed Record ID
    // ----------------------------------------------------
    console.log("\n[Test 12] GET /api/track?id=SSF-2026-849201 (Seed Record)");
    const res12 = await fetch(`${BASE_URL}/api/track?id=SSF-2026-849201`);
    const data12 = await res12.json();
    assert(res12.status === 200, `Status is 200 (got ${res12.status})`);
    assert(data12.found === true, `data.found is true`);
    assert(data12.record.name === "रामेश्वर प्रसाद", `Found Rameshwar Prasad`);
    assert(data12.record.step === 4, `Step is 4 for completed status (got ${data12.record.step})`);

    // ----------------------------------------------------
    // TEST 13: GET /api/track with newly created tracking ID
    // ----------------------------------------------------
    console.log(`\n[Test 13] GET /api/track?id=${createdTrackingId} (New Record)`);
    const res13 = await fetch(`${BASE_URL}/api/track?id=${createdTrackingId}`);
    const data13 = await res13.json();
    assert(res13.status === 200, `Status is 200 (got ${res13.status})`);
    assert(data13.found === true, `data.found is true`);
    assert(data13.record.name === "दिनेश कुमार सिंह", `Found Dinesh Kumar Singh`);
    assert(data13.record.trackingId === createdTrackingId, `TrackingId matches`);
    assert(data13.record.step >= 1, `Step is >= 1 (got ${data13.record.step})`);

    // ----------------------------------------------------
    // TEST 14: GET /api/track with phone number
    // ----------------------------------------------------
    console.log("\n[Test 14] GET /api/track?phone=9812345678 (By Phone)");
    const res14 = await fetch(`${BASE_URL}/api/track?phone=9812345678`);
    const data14 = await res14.json();
    assert(res14.status === 200, `Status is 200 (got ${res14.status})`);
    assert(data14.found === true, `data.found is true`);
    assert(data14.record.trackingId === createdTrackingId, `Found request by phone`);

    // ----------------------------------------------------
    // TEST 15: GET /api/track with Non-Existent ID
    // ----------------------------------------------------
    console.log("\n[Test 15] GET /api/track?id=SSF-9999-000000 (Non-existent)");
    const res15 = await fetch(`${BASE_URL}/api/track?id=SSF-9999-000000`);
    const data15 = await res15.json();
    assert(res15.status === 404, `Status is 404 (got ${res15.status})`);
    assert(data15.found === false, `data.found is false`);

    // ----------------------------------------------------
    // TEST 16: PATCH /api/submissions (Update Status)
    // ----------------------------------------------------
    console.log("\n[Test 16] PATCH /api/submissions (Update Status)");
    const res16 = await fetch(`${BASE_URL}/api/submissions`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer admin@123",
      },
      body: JSON.stringify({
        trackingId: createdTrackingId,
        status: "सेवा दल प्रेषित (राहत सामग्री रवाना)",
        statusCode: "dispatched",
        notes: "राहत दल रवाना कर दिया गया है।",
      }),
    });
    const data16 = await res16.json();
    assert(res16.status === 200, `Status is 200 (got ${res16.status})`);
    assert(data16.success === true, `data.success is true`);
    assert(data16.submission.status.includes("सेवा दल प्रेषित"), `Status updated`);

    // ----------------------------------------------------
    // TEST 17: GET /api/track after status update verifies step progression
    // ----------------------------------------------------
    console.log("\n[Test 17] GET /api/track after status update verifies step progression");
    const res17 = await fetch(`${BASE_URL}/api/track?id=${createdTrackingId}`);
    const data17 = await res17.json();
    assert(res17.status === 200, `Status is 200`);
    assert(data17.record.step === 3, `Progress step updated from 1/2 to 3 (got ${data17.record.step})`);

    // ----------------------------------------------------
    // TEST 18: Verify JSON persistence on local file system
    // ----------------------------------------------------
    console.log("\n[Test 18] Verify disk persistence in src/data/submissionsData.json");
    const filePath = path.join(process.cwd(), "src/data/submissionsData.json");
    assert(fs.existsSync(filePath), `File exists at ${filePath}`);
    const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    assert(Array.isArray(fileContent.submissions), `File contains submissions array`);
    const foundOnDisk = fileContent.submissions.some((s) => s.trackingId === createdTrackingId);
    assert(foundOnDisk, `Record ${createdTrackingId} is persisted to disk`);

    console.log(`\n======================================================`);
    console.log(`ALL TESTS COMPLETE: ${passed} PASSED, ${failed} FAILED`);
    console.log(`======================================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Test runner encountered an error:", err);
    process.exit(1);
  }
}

runTests();
