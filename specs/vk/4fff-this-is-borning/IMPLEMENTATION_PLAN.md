# Implementation plan

1. Complete the ordered SpecKit commands using specs/vk/4fff-this-is-borning as the feature directory and the existing constitution.
2. Rewrite only the stalled-import bullet in resume/David_Vasandani_CV.yaml. Lead with restored content imports, retain credential repair and recovery triggers, and preserve the separate 62 imported / 63 requeued outcomes.
3. Apply /voice manually, document the fact comparison, and run npm run resume:voice. Check the YAML diff contains exactly one changed bullet.
4. Render with the pinned RenderCV setup, build, and run existing tests. Do not add tests that merely mirror the sentence.
5. Run an independent Codex CLI review of the diff. Resolve significant findings and recheck affected behavior.
6. Update the existing resume voice knowledge page and index with reusable evidence limits, tagged with this task's id; commit the knowledge update.
7. Open a PR against the actual repository base branch, wait for required checks and merge.
