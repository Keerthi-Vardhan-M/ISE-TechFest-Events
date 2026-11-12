import http from "k6/http";
import { check, sleep } from "k6";

// Run with: k6 run -e BASE_URL=https://your-app.vercel.app scripts/k6-register-loadtest.js
export const options = {
  scenarios: {
    spike_registrations: {
      executor: "constant-arrival-rate",
      rate: 200,
      timeUnit: "1s",
      duration: "10s",
      preAllocatedVUs: 100,
      maxVUs: 250,
    },
  },
};

export default function () {
  const baseUrl = __ENV.BASE_URL || "http://localhost:3000";
  const unique = `${__VU}_${__ITER}_${Date.now()}`;

  const payload = JSON.stringify({
    event: __ITER % 2 === 0 ? "automate" : "quant",
    teamName: `LoadTeam_${unique}`,
    leaderName: "Load Tester",
    email: `load_${unique}@example.edu`,
    phone: "+919876543210",
    college: "Test Engineering College",
    departmentYear: "CSE 3rd Year",
    members: [],
    txnId: `UTR${unique}`.slice(0, 24),
    consent: true,
    turnstileToken: __ENV.TURNSTILE_TEST_TOKEN || "",
  });

  const res = http.post(`${baseUrl}/api/register`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  check(res, {
    "valid status (201, 409 full/dup, or 429 rate-limit)": (r) =>
      [201, 409, 429].includes(r.status),
  });

  sleep(0.1);
}

