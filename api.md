## v1/issues

> General Chat API , Methods: POST

Request Example:

```json
{
  "issue_id": "R-12345",
  "issue": {
    "issue_title": "Issue Title Demo",
    "issue_description": "Issue Description Demo"
  }
}
```

Respond Example:

```json
{
  "status": "Success",
  "data": {
    "issue_id": "R-12345",
    "request_id": "ramdomstring",
    "revised_issue_title": "TM Operations: Quality of Case Analysis",
    "revised_issue_description": "test",
    "additional_information_needed": "test"
  }
}
```

## v1/issues/feedback

> Methods: POST

```json
{
  "request_id": "R-12345",
  "response_score": "1",
  "feedback": "The response was useless and did not help me at all."
}
```

Respond Example:

```json
{
  "status": "Success"
}
```
