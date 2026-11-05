// Captured output — do not hand-edit the transcripts.
// Every script below was run against vexx1.5 (pure-Python engine,
// CPython 3.11.2) and the stdout is pasted verbatim.

export type Example = {
  id: string;
  number: string;
  level: 'Beginner' | 'Easy' | 'Intermediate' | 'Advanced' | 'Expert';
  tone: 'pass' | 'warn' | 'fail' | 'cobalt';
  title: string;
  hook: string;
  modelSays: string;
  vexxSays: string;
  verdict: { label: string; tone: 'pass' | 'warn' | 'fail' | 'cobalt'; detail: string };
  bullets: string[];
  surface: string[];
  lesson: string;
  file: string;
  script: string;
  output: string;
};

export const examples: Example[] = [
  {
    id: "invoice",
    number: "01",
    level: "Beginner",
    tone: "pass",
    title: "The invoice that does its own arithmetic",
    hook: "Ask a model for five numbers that agree with each other. Watch two of them quietly stop agreeing.",
    modelSays: "tax: 29.99, total: 179.96",
    vexxSays: "tax: 29.994, total: 179.964 — computed, not sampled",
    verdict: { label: "off by 0.004", tone: "fail", detail: "the derived tax is off by 0.004 and the total inherits it" },
    bullets: [
      "`derive` turns tax, net and total into outputs: hand the engine `quantity`, `unit_price` and `tax_rate` and it returns the rest.",
      "The rounded answer fails on `tax == (net * tax_rate)` with a hint that names the constraint and the exact 0.004 to add.",
      "Bump the quantity to 100 and the `total <= 5000` budget trips at +998.8 — before anything is ordered, quoted or charged.",
    ],
    surface: ["vx.verified_schema", "vx.derive", "vx.require", "verify()"],
    lesson: "The cheapest bug in software is the one your schema refuses to write.",
    file: "01_invoice_math.py",
    script: "\"\"\"Example 1 — the invoice that does its own arithmetic.\"\"\"\nimport vexx as vx\nfrom pydantic import BaseModel, Field\n\n\nclass Invoice(BaseModel):\n    quantity: int = Field(ge=1, le=100)\n    unit_price: float = Field(ge=0.01, le=5_000.0)\n    net: float\n    tax_rate: float = Field(ge=0.0, le=0.30)\n    tax: float\n    total: float\n\n\n@vx.verified_schema()\ndef invoice(inv: Invoice):\n    vx.derive(inv.net == inv.quantity * inv.unit_price, tol=1e-6)\n    vx.derive(inv.tax == inv.net * inv.tax_rate, tol=1e-6)\n    vx.derive(inv.total == inv.net + inv.tax, tol=1e-6)\n    vx.require(inv.total <= 5_000.0)\n\n\ndef show(label, report):\n    print(f\"\\n{label}\")\n    if report.status == \"PASS\":\n        values = {k: report.values[k] for k in (\"net\", \"tax\", \"total\")}\n        print(f\"  PASS  {values}\")\n    else:\n        for outcome in report.violations:\n            print(f\"  FAIL  {outcome.text}   (off by {outcome.residual:+.6g})\" if outcome.residual is not None\n                  else f\"  FAIL  {outcome.text}\")\n    for hint in report.relaxation:\n        print(f\"  hint  {hint.split('; ', 1)[-1]}\")\n\n\nshow(\"model output — tax rounded to cents\", invoice.verify(\n    {\"quantity\": 3, \"unit_price\": 49.99, \"tax_rate\": 0.2, \"net\": 149.97, \"tax\": 29.99, \"total\": 179.96}))\n\nshow(\"same order, derived fields omitted\", invoice.verify(\n    {\"quantity\": 3, \"unit_price\": 49.99, \"tax_rate\": 0.2}))\n\nshow(\"100 units against a 5,000 limit\", invoice.verify(\n    {\"quantity\": 100, \"unit_price\": 49.99, \"tax_rate\": 0.2}))",
    output: "\nmodel output — tax rounded to cents\n  FAIL  tax == (net * tax_rate)   (off by -0.004)\n  hint  increase the target/constant by 0.004 (or widen tol to 0.004) to make it satisfiable\n\nsame order, derived fields omitted\n  PASS  {'net': 149.97, 'tax': 29.994, 'total': 179.964}\n\n100 units against a 5,000 limit\n  FAIL  total <= 5000   (off by +998.8)\n  hint  decrease the target/constant by 998.8 (or widen tol to 999) to make it satisfiable",
  },
  {
    id: "schedule",
    number: "02",
    level: "Easy",
    tone: "warn",
    title: "The scheduler that will not double-book a GPU",
    hook: "Three jobs, one GPU, and a model that is completely certain overlapping is fine.",
    modelSays: "render @0, encode @0, publish @3",
    vexxSays: "render @0, encode @3, publish @6",
    verdict: { label: "capacity, then precedence", tone: "warn", detail: "two separate invariants fire before the plan is accepted" },
    bullets: [
      "The naive plan double-books the GPU: `load 2 exceeds capacity 1`, and the violation names both offending tasks.",
      "Spreading the GPU work fixes capacity and exposes the next bug — `publish starts before encode ends`. Two rounds, two real defects.",
      "`earliest_schedule()` is precedence-only, which is exactly why capacity has to be enforced in `validate()`.",
    ],
    surface: ["SchedulingProblem", "set_capacity", "add_task", "validate"],
    lesson: "A plan is not a schedule until something checks it.",
    file: "02_schedule.py",
    script: "\"\"\"Example 3 — a GPU cluster that says no to double-booking.\"\"\"\nfrom vexx.cartridges.or_sched import SchedulingProblem\n\nproblem = SchedulingProblem(horizon=24.0)\nproblem.set_capacity(\"gpu\", 1)\nproblem.add_task(\"render\", duration=3.0, resource=\"gpu\", demand=1.0)\nproblem.add_task(\"encode\", duration=3.0, resource=\"gpu\", demand=1.0)\nproblem.add_task(\"publish\", duration=1.0, predecessors=[\"render\", \"encode\"])\n\ndef check(label, plan):\n    violations = problem.validate(plan)\n    print(f\"\\n{label}\")\n    if not violations:\n        print(\"  OK    no violations\")\n        return\n    for v in violations:\n        print(f\"  {v.kind.upper()}  {v.message}\")\n        if v.tasks:\n            print(f\"        tasks: {', '.join(v.tasks)}\")\n\ncheck(\"model plan — render @0, encode @0, publish @3\", {\"render\": 0.0, \"encode\": 0.0, \"publish\": 3.0})\ncheck(\"first fix — spread the GPU jobs, publish @5\", {\"render\": 0.0, \"encode\": 3.0, \"publish\": 5.0})\ncheck(\"second fix — publish waits for encode to finish\", {\"render\": 0.0, \"encode\": 3.0, \"publish\": 6.0})\n\nprint(\"\\nearliest_schedule() (precedence only):\", problem.earliest_schedule())",
    output: "\nmodel plan — render @0, encode @0, publish @3\n  CAPACITY  resource 'gpu' load 2 exceeds capacity 1\n        tasks: render, encode\n\nfirst fix — spread the GPU jobs, publish @5\n  PRECEDENCE  publish starts before encode ends\n        tasks: encode, publish\n\nsecond fix — publish waits for encode to finish\n  OK    no violations\n\nearliest_schedule() (precedence only): {'render': 0.0, 'encode': 0.0, 'publish': 3.0}",
  },
  {
    id: "portfolio",
    number: "03",
    level: "Intermediate",
    tone: "fail",
    title: "The portfolio whose Sharpe ratio fails arithmetic",
    hook: "The model writes 0.78. The covariance matrix says 0.59445. Only one of them attended university.",
    modelSays: "sharpe: 0.78",
    vexxSays: "sharpe: 0.59445",
    verdict: { label: "plausible, wrong", tone: "fail", detail: "hand-supplied Sharpe is off by 0.185548 from the risk it claims to measure" },
    bullets: [
      "`vx.dot`, `vx.sqrt` and `vx.quad_form` run inside the constraint language, so expected return and volatility are spliced from the weights.",
      "Preflight returns `UNKNOWN` rather than a false verdict, so `verify()` goes to the solver instead of guessing.",
      "Swap in a correct Sharpe and the model still has to clear `sharpe >= 0.55` before anyone allocates a rupee.",
    ],
    surface: ["vx.derive", "vx.dot", "vx.quad_form", "preflight"],
    lesson: "Risk numbers you cannot reproduce are vibes with decimal points.",
    file: "03_portfolio.py",
    script: "\"\"\"Example 3 — a portfolio model where the risk numbers are computed, not sampled.\"\"\"\nimport vexx as vx\nfrom pydantic import BaseModel\n\nRETURNS = {\"AAPL\": 0.14, \"MSFT\": 0.13, \"NVDA\": 0.24}\nRISK_FREE = 0.04\nCOV = {\n    (\"AAPL\", \"AAPL\"): 0.048, (\"AAPL\", \"MSFT\"): 0.031, (\"AAPL\", \"NVDA\"): 0.042,\n    (\"MSFT\", \"MSFT\"): 0.039, (\"MSFT\", \"NVDA\"): 0.036, (\"NVDA\", \"NVDA\"): 0.095,\n}\n\n\nclass Portfolio(BaseModel):\n    weights: dict\n    expected_return: float\n    volatility: float\n    sharpe: float\n\n\n@vx.verified_schema()\ndef portfolio(p: Portfolio):\n    vx.require(vx.keys_subset(p.weights, {\"AAPL\", \"MSFT\", \"NVDA\"}))\n    vx.require(vx.sum(p.weights.values()) == 1.0, tol=1e-6)\n    vx.require(vx.forall(p.weights.values(), lambda w: (0.05 <= w) & (w <= 0.50)))\n    vx.derive(p.expected_return == vx.dot(p.weights, RETURNS), tol=1e-5)\n    vx.derive(p.volatility == vx.sqrt(vx.quad_form(p.weights, COV)), tol=1e-5)\n    vx.derive(p.sharpe == (p.expected_return - RISK_FREE) / p.volatility, tol=1e-5)\n    vx.require(p.sharpe >= 0.55)\n\n\ndef show(label, report):\n    print(f\"\\n{label}\")\n    if report.status == \"PASS\":\n        v = report.values\n        print(f\"  PASS  expected_return {v['expected_return']:.5g} · volatility {v['volatility']:.6g} · sharpe {v['sharpe']:.5g}\")\n    else:\n        for outcome in report.violations:\n            print(f\"  FAIL  {outcome.text}   (off by {outcome.residual:+.6g})\" if outcome.residual is not None\n                  else f\"  FAIL  {outcome.text}\")\n    for hint in report.relaxation:\n        print(f\"  hint  {hint.split('; ', 1)[-1]}\")\n\n\nprint(\"preflight:\", portfolio.preflight.status)\n\nshow(\"weights only — the risk numbers are spliced, not sampled\",\n     portfolio.verify({\"weights\": {\"AAPL\": 0.40, \"MSFT\": 0.35, \"NVDA\": 0.25}}))\n\nshow(\"the model rounds its own Sharpe ratio to 0.78\",\n     portfolio.verify({\"weights\": {\"AAPL\": 0.40, \"MSFT\": 0.35, \"NVDA\": 0.25},\n                       \"expected_return\": 0.1615, \"volatility\": 0.20439, \"sharpe\": 0.78}))",
    output: "preflight: UNKNOWN\n\nweights only — the risk numbers are spliced, not sampled\n  PASS  expected_return 0.1615 · volatility 0.20439 · sharpe 0.59445\n\nthe model rounds its own Sharpe ratio to 0.78\n  FAIL  sharpe == ((expected_return - 0.04) / volatility)   (off by +0.185548)\n  hint  decrease the target/constant by 0.185548 (or widen tol to 0.186) to make it satisfiable",
  },
  {
    id: "sql",
    number: "04",
    level: "Advanced",
    tone: "cobalt",
    title: "The text-to-SQL agent that cannot be talked into a breach",
    hook: "One missing WHERE clause between your demo and somebody else's order history.",
    modelSays: "SELECT * FROM orders LIMIT 10",
    vexxSays: "missing conjunctive tenant-isolation predicate on tenant_id",
    verdict: { label: "4 queries, 3 rejections", tone: "cobalt", detail: "no tenant predicate, an invented table, and a DROP never reach the database" },
    bullets: [
      "The legitimate query resolves two tables, an alias and a foreign-key join, and reports `tenant_filter=True`.",
      "Tenant isolation has to be a top-level conjunctive equality — a substring or an `OR` branch does not count.",
      "Read-only is not a guideline: `DROP TABLE orders` is rejected by the pipeline, not by a downstream permission error.",
    ],
    surface: ["SqlCatalog", "ForeignKey", "SqlVerifier", "require_tenant"],
    lesson: "The model gets to be creative. The parser does not get to be.",
    file: "04_sql_guard.py",
    script: "\"\"\"Example 4 — the text-to-SQL pipeline that only runs queries it can prove safe.\"\"\"\nfrom vexx.cartridges.sql import ForeignKey, SqlCatalog, SqlVerifier\n\ncatalog = SqlCatalog(\n    tables={\n        \"customers\": [\"id\", \"tenant_id\", \"email\"],\n        \"orders\": [\"id\", \"tenant_id\", \"customer_id\", \"total\"],\n    },\n    foreign_keys=[ForeignKey(\"orders\", \"customer_id\", \"customers\", \"id\")],\n    require_tenant=True,\n)\nverifier = SqlVerifier(catalog, read_only=True)\n\nQUERIES = [\n    \"SELECT o.id, o.total FROM orders o JOIN customers c \"\n    \"ON o.customer_id = c.id WHERE o.tenant_id = 'acme' LIMIT 10\",\n    \"SELECT * FROM orders LIMIT 10\",\n    \"SELECT id, total FROM orderz WHERE tenant_id = 'acme'\",\n    \"DROP TABLE orders\",\n]\n\nfor sql in QUERIES:\n    result = verifier.verify(sql)\n    print(f\"\\n{sql}\")\n    print(f\"  ok={result.ok}  tables={result.tables}  tenant_filter={result.has_tenant_filter}\")\n    for error in result.errors:\n        print(f\"  rejected: {error}\")",
    output: "\nSELECT o.id, o.total FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.tenant_id = 'acme' LIMIT 10\n  ok=True  tables=['customers', 'orders']  tenant_filter=True\n\nSELECT * FROM orders LIMIT 10\n  ok=False  tables=['orders']  tenant_filter=False\n  rejected: missing required conjunctive tenant-isolation predicate on `tenant_id`\n\nSELECT id, total FROM orderz WHERE tenant_id = 'acme'\n  ok=False  tables=[]  tenant_filter=False\n  rejected: unknown table `orderz`\n\nDROP TABLE orders\n  ok=False  tables=[]  tenant_filter=False\n  rejected: read-only pipeline rejected a `DROP` statement",
  },
  {
    id: "agent",
    number: "05",
    level: "Expert",
    tone: "pass",
    title: "The agent that cannot refund before it knows who",
    hook: "A refund tool, a 500-unit budget, and a KYC gate that holds when the model is in a hurry.",
    modelSays: "refund(customer='cust_7', amount=250)",
    vexxSays: "DENIED — missing facts: ['kyc_ok', 'budget_ok']",
    verdict: { label: "rules, budgets, traces", tone: "pass", detail: "preconditions, a temporal policy and a spend cap all enforce on the same state machine" },
    bullets: [
      "`ltlf.before('verify_identity', 'refund')` is checked prospectively, so the illegal call never enters the trace.",
      "Effects from `verify_identity` satisfy the refund preconditions; the legal path commits as `refund@2`.",
      "The second refund drains the 500 budget, `can_call('refund')` flips to False, and the trace is three calls long — auditable, replayable, boring in the best way.",
    ],
    surface: ["WorldState", "declare_tool", "ltlf.before", "set_budget"],
    lesson: "Capability without consent is an incident report with good typography.",
    file: "05_agent_iam.py",
    script: "\"\"\"Example 5 — an agent that cannot spend money it has not earned the right to spend.\"\"\"\nfrom vexx import ltlf\nfrom vexx.cartridges.sec import PolicyViolation, WorldState\n\nworld = WorldState()\nworld.declare_tool(\"verify_identity\", effects=[\"kyc_ok\", \"budget_ok\"])\nworld.declare_tool(\"refund\", requires=[\"kyc_ok\", \"budget_ok\"], cost=250.0, budget_key=\"spend\", mutating=True)\nworld.set_budget(\"spend\", 500.0)\n\n# Hard rule: identity verification must happen before any refund.\nworld.add_policy(ltlf.before(\"verify_identity\", \"refund\"), name=\"kyc-before-refund\")\n\n\ndef attempt(label, *calls):\n    print(f\"\\n{label}\")\n    try:\n        for tool, data in calls:\n            print(f\"  ok    {world.call(tool, **data)}\")\n    except PolicyViolation as exc:\n        print(f\"  DENIED  {exc}\")\n\n\nattempt(\"step 1 — refund straight away\", (\"refund\", {\"amount\": 250}))\nattempt(\"step 2 — verify identity, then refund\",\n        (\"verify_identity\", {\"user\": \"cust_7\"}), (\"refund\", {\"amount\": 250}))\nattempt(\"step 3 — a second refund drains the last 250 of budget\",\n        (\"refund\", {\"amount\": 250}))\n\nprint(f\"\\nremaining spend: {world.remaining('spend')}\")\nprint(f\"can_call('refund') -> {world.can_call('refund')}\")\nprint(f\"trace: {world.trace_names()}\")",
    output: "\nstep 1 — refund straight away\n  DENIED  tool 'refund' precondition not satisfied; missing facts: ['kyc_ok', 'budget_ok']\n\nstep 2 — verify identity, then refund\n  ok    verify_identity@1\n  ok    refund@2\n\nstep 3 — a second refund drains the last 250 of budget\n  ok    refund@3\n\nremaining spend: 0.0\ncan_call('refund') -> False\ntrace: ['verify_identity', 'refund', 'refund']",
  },
];
