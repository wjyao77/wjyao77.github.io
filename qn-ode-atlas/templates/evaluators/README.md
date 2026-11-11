# Per-axis definitions and proposal prompts

Each `z01`–`z20` directory contains a frozen `descriptor.json` and an axis-specific `prompt.md`. The descriptor records the actual evaluator formula, coordinate convention, scope, dependencies, output/projection versions, units, null states, evidence boundaries, three mathematical example specifications, source hashes and relevant existing test references. `manifest.json` lists all forty files and hashes; `schema.json` describes this documentation format.

The example specifications are **proposed, not executed as written**. A separate section records relevant tests from the actual 14-test evaluator suite run during authorship. Do not conflate the two. The descriptions retain the implementation's difference between numeric measurements, supplied declarations, narrow analytic statements, and independently verified domain certificates.

For a new evaluator submission, use the parent [proposal contract](../evaluator-proposal-contract.json) and [proposal guidance](../evaluator-proposal-guidance.md), not this operational-document schema. The registry descriptor embedded in each file is preserved exactly; no registration or execution approval is conferred by generating documentation.

Every prompt requires authenticated Astra mathematical authorship and a different authenticated Astra mathematical reviewer. Sol may handle engineering. Reviewer/model names in a document are not proof of actual identity, and the document does not automatically certify a claim. Review status and source bindings must be checked before publishing a frozen version.
