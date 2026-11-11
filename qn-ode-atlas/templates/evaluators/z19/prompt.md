# z19: Scaled state-norm dynamics — mathematical author and independent review prompt

Use the adjacent `descriptor.json` as the frozen implementation contract. Verify its source hashes before changing this axis. The actual registry descriptor, engine result version and projection versions are distinct fields; do not silently equate them.

## Astra mathematical author

An authenticated **gpt-6-astra** author must state the precise claim and implement only the authorized scope. **gpt-6.1-sol may perform engineering only** (packaging, UI, wiring, documentation mechanics); it must not substitute for mathematical authorship or approval. Naming a model in text is not evidence of its actual use.

For this axis the current computation is:

Compute r_k=||x_k/D||2. Return first,last,min,max and max(r)/r0 only if r0>0, otherwise null.

Operational scope: **point or trajectory**. Units/convention: scaled-state L2 units; amplification dimensionless. Work with y=D^-1 x, tau=t/Ts, g=Ts D^-1 f(t,Dy), J=Ts D^-1 A D unless the formula explicitly returns physical coordinates. Use L2, with Frobenius only where specified.

The critical mathematical boundary is: **Sample extrema are not continuous-time bounds; normalizations are part of the comparison contract.**

Explain why each dependency in descriptor.json is necessary. Preserve separate declared, numerical, analytic and independently certified evidence. No bound-certificate adapter is implemented for this axis. Do not invent a certificate route. Preserve null/failure semantics; a zero value must represent an actual measured/derived zero. Inspect full_original_window and reference provenance; partial observations must not silently acquire full-horizon scope.

Required axis-specific example specifications:

- **positive — proposed, not executed as written:** x(t)=exp(-t), x0=1 on [0,1], unit scales. Expected: initial=1, final=exp(-1), sample_max=1, amplification=1.
- **counterexample — proposed, not executed as written:** Physical state [1,2], state scales [1,2]. Expected: scaled norm=sqrt(2), not physical norm sqrt(5).
- **degenerate — proposed, not executed as written:** xprime=1, x0=0, t=[0,1]. Expected: initial=0, sample_max=1, amplification=null rather than infinity or zero.

These examples are proposed, not run by this document. Produce actual isolated-run artifacts with the input, expected assertion, observed value/status, tolerances, code hash and complete output. Related existing test references are in descriptor.json and must not be relabeled as execution of a different example.

For a new or changed evaluator, prepare an `evaluator_proposal_v1` submission conforming to `../../evaluator-proposal-contract.json`: mathematical definition, supported scopes/evidence, units, versioned projections, dependencies/execution contract, primary sources or explicit derivation artifacts, and these positive/counterexample/degenerate cases. State what is unproved. Never execute submitted untrusted source on the host; use the reviewed isolated runner.

## Independent Astra reviewer

A **different authenticated gpt-6-astra reviewer** must inspect the actual implementation and source hashes, independently derive the formulas and all expected examples, check scaling and scope, verify null cases and each projection's version/evidence acceptance, and inspect real test artifacts. For z19, explicitly challenge this failure mode: Physical state [1,2], state scales [1,2]. The required distinction is: scaled norm=sqrt(2), not physical norm sqrt(5).

Also inspect the degenerate boundary: xprime=1, x0=0, t=[0,1]. Expected handling: initial=0, sample_max=1, amplification=null rather than infinity or zero. Do not accept a sampled or declared property as a theorem. Record accepted/rejected/unresolved findings and limitations, exact proposal and implementation SHA256, reviewer identity, model provenance and review artifact hash. A copied approval flag or self-declared model name is insufficient. The author cannot approve their own mathematics.

Return missing evidence when any obligation is absent. `ready_for_governed_execution` is workflow readiness only; this prompt and its examples do not certify mathematical truth or authorize automatic deployment. Do not replace numerical measurement fields with certified domain bounds; preserve the separately bound claim route where implemented.
