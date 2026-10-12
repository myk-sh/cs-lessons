# IGCSE 0478 encryption: sources and marking scope

Core: Cambridge 0478 section 2.3 and the teacher-supplied Hodder extract, printed pp.63–66. The attached quantum-cryptography extension (printed p.67 onward) is outside the core lesson. The practice bank adapts eight published question parts from 2024–2025 and retains their 17 official marks. Original retrieval, toy-cipher, ownership and repair tasks use 34 suggested marks. All question papers and their published Cambridge schemes were read from the existing 2023–2025 Paper 1 research collection.

## Selected questions

| Paper / part | Marks | Focus | Sources |
| --- | ---: | --- | --- |
| 0478/12 Feb/Mar 2024 Q7(a)(i) | 1 | purpose | [QP](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_m24_qp_12.pdf) · [MS](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_m24_ms_12.pdf) |
| 0478/12 May/June 2024 Q2(c)(i) | 4 | symmetric | [QP](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_s24_qp_12.pdf) · [MS](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_s24_ms_12.pdf) |
| 0478/11 May/June 2024 Q7 | 4 | cloze | [QP](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_s24_qp_11.pdf) · [MS](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_s24_ms_11.pdf) |
| 0478/12 Feb/Mar 2024 Q7(a)(ii) | 4 | compare | [QP](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_m24_qp_12.pdf) · [MS](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_m24_ms_12.pdf) |
| 0478/13 Oct/Nov 2024 Q2(g)(ii) | 1 | similarity | [QP](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_w24_qp_13.pdf) · [MS](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_w24_ms_13.pdf) |
| 0478/11 May/June 2025 Q6(b) | 1 | reason | [QP](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_s25_qp_11.pdf) · [MS](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_s25_ms_11.pdf) |
| 0478/11 Oct/Nov 2025 Q2(e)(i) | 1 | tick | [QP](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_w25_qp_11.pdf) · [MS](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_w25_ms_11.pdf) |
| 0478/11 Oct/Nov 2025 Q2(e)(ii) | 1 | other | [QP](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_w25_qp_11.pdf) · [MS](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_w25_ms_11.pdf) |

## Marking and technical precision

- May/June 2024 /12 Q2(c)(i) requires the **same key for encryption and decryption** for one mark, plus any three other accepted points. The key/algorithm relationship and plaintext→ciphertext transition are separate points in that scheme. The lesson's worked answer makes all four ideas explicit.
- Feb/Mar 2024 /12 Q7(a)(ii) permits any four listed contrast points. The model is one route, not a compulsory answer; the key retains sharing/ownership alternatives.
- Oct/Nov 2024 /13 Q2(g)(ii) accepts a shared purpose, transformation or use of keys. Sharing the SAME key is not a similarity of both methods.
- May/June 2025 /11 Q6(b) accepts avoiding key exchange or the broad phrase more secure. Prefer the concrete explanation that the private decryption key does not need to be distributed. This does not make symmetric encryption universally weak.
- Oct/Nov 2025 /11 Q2(e)(i) selects C: the symmetric key is shared with the receiving device. The blanket most-secure statement is a distractor.
- **Not used as a student task:** May/June 2025 /11 Q6(a) imprecisely calls an encryption key a type of algorithm and accepts either public/private direction for two gaps. Teach an algorithm as a procedure and a key as a value; use the unambiguous May/June 2024 /11 Q7 for confidentiality (recipient's public key encrypts; matching private key decrypts). Teacher notes record the scheme's ambiguity.
- Oct/Nov 2024 /13 Q2(g)(iii), not selected, loosely calls a symmetric key one/public and gives a blanket security comparison. Teach a shared **secret** key and the key-distribution problem. Do not distribute the secret unprotected beside its ciphertext.
- The supplied textbook says the matching keys cannot be derived from each other. The needed confidentiality property is that recovering the private key from public information is computationally infeasible with suitable cryptography; do not teach that a public key cannot be computed from private-key material.
- The simple letter shift is only a visual illustration. Encryption uses the same key value for the reverse operation. It is not recommended security. The original answers (BRING MAP → FVMRK QET at +4; XLMW → THIS at −4) and wraparound were checked by simulation.

## Teaching sequence

Slides 1–16 develop purpose, vocabulary, algorithm versus key, symmetric sharing, asymmetric ownership and two-way communication. An unmarked financial-data scenario checks understanding before exam framing on slide 17. Selected questions fit a 60-minute core route; use the complete practice bank and Task 6 as follow-up. The student booklet teaches concepts before practice and omits the matching model-answer slides. Teacher keys remain excluded from the public site.

## Syllabus references

[0478 2026–2028 syllabus](https://www.cambridgeinternational.org/Images/697167-2026-2028-syllabus.pdf), section 2.3.

Whole textbook and past-paper PDFs are kept in the research workspace, not republished. Question wording and marking points are adapted/paraphrased; published mark allocations are retained. Photograph sources and licences are in the slides/notes, document credits and scripts/lessons/assets/encryption/photos/credits.json.
