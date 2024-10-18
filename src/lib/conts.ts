export const hero_title = `Risk Management Co-pilot`

export const hero_description = `A generative AI assistant that helps you draft risk and control narratives. Select the task that you need help with.`

export const statement = `By accessing and using this service, you attest to comply with and bound by following the terms and conditions of use. If you do not comply with below terms and policy, please refrain from using our service. This internal service is for internal usage only. Visitors are not authorized to submit any personal data, customer data, restricted or highly restricted data and production data. Any unauthorized use of this service is prohibited.Data will be logged for audit purpose.`

export const revisedTitle = `TM Operations: Quality of Case Analysis`

export const revisedDescription = `Condition - The issue is not cleary stated, It is unclear what the issue is.
Criteria - The potential impact of the risk or control gap on the business
Cause - No explanation is given why the risk or control gap is not acceptable
Consequence - Please provide the potential impact of the risk or control gap on the business
Context - There is no quantitative analysis of the risk or control gap
`
export const additionalInfo = `
1. What is the risk or control gap?
2. What is the impact of the risk or control gap?
3. What is the proposed solution?
`

export const issue_title = `Draft Issue Title`

export const issue_description = `Draft Issue Description`

export const suggessted_issue_title = `Suggested Issue Title`

export const suggessted_issue_description = `Suggested Issue Description`

export const additional_information_needed = `Addidional Information Needed`

export const issue_title_placeholder = `e.g. Inadequate Access Control for Sensitive Data`

export const issue_description_placeholder = `e.g. The current access control mechanisms in place for sensitive data within the organization are inadequate, allowing unauthorized personnel to potentially access confidential information. This gap could lead to data breaches, unauthorized data manipulation, and a loss of customer trust. The lack of role-based access controls (RBAC) and periodic access reviews exacerbates this risk, making it imperative to strengthen access policies and implement stricter data governance practices.`

export const components: {
  title: string
  href: string
  description: string
}[] = [
  {
    title: "Create Issue",
    href: "/issue",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Review Issue",
    href: "/review-issue",
    description: "Assist in issue creation to the framework requirements",
  },
  {
    title: "Vulnerability drafting",
    href: "/docs/primitives/progress",
    description:
      "Review and enhance an Operational Resilence Vulnerability description",
  },
  {
    title: "Issue Thematic Analysis",
    href: "/docs/primitives/scroll-area",
    description: "Analyse and suggest themes in the causes of issues",
  },
  {
    title: "Control Assessment Drafting",
    href: "/docs/primitives/tabs",
    description:
      "Draft control effectiveness rationable based on assosiated issues",
  },
  {
    title: "Control Monitoring Drafting",
    href: "/docs/primitives/tooltip",
    description:
      "Draft the control monitoring description considering linked issues and KCIs",
  },
]
