# z10: Candidate first-integral drift — mathematical author and independent review prompt

Use the adjacent `descriptor.json` as the frozen implementation contract. Verify its source hashes before changing this axis. The actual registry descriptor, engine result version and projection versions are distinct fields; do not silently equate them.

## Astra mathematical author

An authenticated **gpt-6-astra** author must state the precise claim and implement only the authorized scope. **gpt-6.1-sol may perform engineering only** (packaging, UI, wiring, documentation mechanics); it must not substitute for mathematical authorship or approval. Naming a model in text is not evidence of its actual use.

For this axis the current computation is:

Evaluate explicitly supplied invariant callbacks I(x) in physical coordinates x=D y; report I(x0) and max over stored samples of |I(xk)-I(x0)|.

Operational scope: **trajectory or point; separate certified domain claim allowed**. Units/convention: candidate-specific physical units. Work with y=D^-1 x, tau=t/Ts, g=Ts D^-1 f(t,Dy), J=Ts D^-1 A D unless the formula explicitly returns physical coordinates. Use L2, with Frobenius only where specified.

The critical mathematical boundary is: **No complete invariant discovery; small sampled drift does not prove Lie derivative zero.**

Explain why each dependency in descriptor.json is necessary. Preserve separate declared, numerical, analytic and independently certified evidence. Supported independently verified bound claim kind first_integral. Concrete certificate must bind authoritative expression AST, parameters, state box, requested time interval, and scales; the independent verifier recomputes it. Numeric output remains separate. Preserve null/failure semantics; a zero value must represent an actual measured/derived zero. Inspect full_original_window and reference provenance; partial observations must not silently acquire full-horizon scope.

Required axis-specific example specifications:

- **positive — proposed, not executed as written:** Rotation xprime=-y,yprime=x with candidate I=x^2+y^2 and exact samples on unit circle. Expected: initial=1; candidate maximum absolute drift approximately 0.
- **counterexample — proposed, not executed as written:** xprime=1, x0=1, times [0,1], candidate I=x^2. Expected: initial=1 and maximum drift=3; candidate is not a first integral.
- **degenerate — proposed, not executed as written:** No candidate callback or model invariant provider. Expected: unsupported invariant_candidates; no automatic mass/energy guess.

These examples are proposed, not run by this document. Produce actual isolated-run artifacts with the input, expected assertion, observed value/status, tolerances, code hash and complete output. Related existing test references are in descriptor.json and must not be relabeled as execution of a different example.

For a new or changed evaluator, prepare an `evaluator_proposal_v1` submission conforming to `../../evaluator-proposal-contract.json`: mathematical definition, supported scopes/evidence, units, versioned projections, dependencies/execution contract, primary sources or explicit derivation artifacts, and these positive/counterexample/degenerate cases. State what is unproved. Never execute submitted untrusted source on the host; use the reviewed isolated runner.

## Independent Astra reviewer

A **different authenticated gpt-6-astra reviewer** must inspect the actual implementation and source hashes, independently derive the formulas and all expected examples, check scaling and scope, verify null cases and each projection's version/evidence acceptance, and inspect real test artifacts. For z10, explicitly challenge this failure mode: xprime=1, x0=1, times [0,1], candidate I=x^2. The required distinction is: initial=1 and maximum drift=3; candidate is not a first integral.

Also inspect the degenerate boundary: No candidate callback or model invariant provider. Expected handling: unsupported invariant_candidates; no automatic mass/energy guess. Do not accept a sampled or declared property as a theorem. Record accepted/rejected/unresolved findings and limitations, exact proposal and implementation SHA256, reviewer identity, model provenance and review artifact hash. A copied approval flag or self-declared model name is insufficient. The author cannot approve their own mathematics.

Return missing evidence when any obligation is absent. `ready_for_governed_execution` is workflow readiness only; this prompt and its examples do not certify mathematical truth or authorize automatic deployment. Do not replace numerical measurement fields with certified domain bounds; preserve the separately bound claim route where implemented.
