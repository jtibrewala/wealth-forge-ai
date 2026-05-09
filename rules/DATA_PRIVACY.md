# Data Privacy & Security

1.  **PII Masking**: Agents must never store or transmit personally identifiable information (PII) like PAN, SSN, Aadhar, or full bank account numbers in clear text.
2.  **Local Processing**: Preference should be given to local parsing of financial documents (statements, Form 16) where possible.
3.  **Anonymization**: Before sending data to LLMs, ensure transaction descriptions are anonymized (e.g., "Purchase at AMAZON" instead of "Purchase at AMAZON by John Doe").
4.  **Encryption**: Any stored financial data must be encrypted at rest.
