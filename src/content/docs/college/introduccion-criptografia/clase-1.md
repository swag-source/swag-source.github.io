---
title: Clase 01 — Introduction
description: The following class makes a brief introduction on the concepts of Classical & Modern cryptography. Walkthrough basic technical concepts
---

## Classical Cryptography

- **Intention: "art form"** - writing & solving codes
  - Sender Alice → sends a message → Receiver Bob
  - **Problem:** There might be an adversary Eve such that Eve prevents communication from Alice → Bob.

## Modern Cryptography

- Late 20th century (since 1980s)
  - It allowed us to understand _what's possible to do_ but also showing _what's difficult to do_ with current **secure computation**.
- It is proposed mainly on a network (understood as an undirected graph) where there are _benevolent_ & _malicious_ nodes.
- _Malicious nodes_ want to disrupt the communication between benevolent nodes.
  - The intentions of _malicious nodes_ can vary. They can have economical incentives that come from miscomputation inside the network.

- **Secure Multi-Party Computation (MPC) [GMW '87] — _a.k.a Secure Function Evaluation (SFE)_**
  - **n** parties {p₁,…,pₙ}, **t** _corrupted nodes._ Each _pᵢ_ holds a private input _xᵢ_
  - One public function _f(x₁,…,xₙ)_
  - All want to learn _y = f(x₁,…,xₙ)_ → **(Correctness)**
  - Nobody wants to disclose their private input → **(Privacy)**

- **Secure 2-party computation (2PC) [Yao '82] → n = 2**

**Examples of secure (multi-party) computation:**

- _Authentication_
  - Parties: 1 server, 1 client
  - Function: `if (server.password == client.password) → return "true" else "fail"`
- _Online Bidding_
  - Parties: 1 seller, 1 buyer
  - Function: `if (seller.price <= buyer.price) → return (seller.price + buyer.price) / 2 else return "no transaction"`
- _Secure integer comparison_
  - Comparing integers without revealing the values to the other party.
- _Auctions_
  - Parties: 1 auctioneer, (n−1) bidders
  - Function: Many possibilities (e.g., Vickrey auction)

_Modern cryptography differs from Classical Cryptography due to_:

- Rigorous, scientific approach, based on complexity-theoretic foundations
- It aims to quantify security guarantees, based on mathematical definitions and security proofs
- _Classical Cryptography_ was an art form, not based on quantitative analysis

## Private-Key Encryption

**Classical crypto:** Construction of _ciphers_ (encryption schemes) for providing secret communication between two parties sharing a key in advance.

**Two parties:** Alice and Bob; reliable communication link

**Goal:** Send message (**m**) while hiding it from Eve (assuming Eve can intercept their communication)

_Common syntax for cryptographic schemas:_

- **K:** Key space
- **M:** Message (or plaintext) space
- **Three algorithms:**
  - **_Gen():_** The key generation algorithm. Outputs a key **k** according to some distribution over **K**.
  - **_Enc(k, m):_** Encryption algorithm. Takes as input a key **k** and a plaintext message **m**, and outputs a ciphertext **c** — denoted _Enc(k, m) = c_.
  - **_Dec(k, c):_** Decryption algorithm. Takes as input a key **k** and a ciphertext **c**, and outputs the original plaintext **m**.
- **Correctness requirement:** For every **k** output by _Gen()_ and every message **m** in **M**, it holds that:

> _Dec(k, Enc(k, m)) = m_

> **Important:** _Dec(k, Enc(m,k)) = m_ is **not always assumed to hold perfectly.** If we do assume this, then the model is called a **perfect cryptographic scheme**.

### Security Goals

Based on the output of the encryption, we want the following goals to hold:

1. No adversary can determine **m** — or even _stronger_:
2. No adversary can determine _any_ information about **m**

- Suppose _m = "Attack on Sunday at 17:15"_
- The adversary learns `*******u*******`
- Goal 1 is satisfied; goal 2 is **not** (a single letter leaks)

### Adversarial Model

- Assume the adversary knows the encryption and decryption algorithms
- _Kerckhoffs's Principle (1883):_
  - The only thing the adversary doesn't know is the key **k**
- This is convenient because:
  - Only a short key (**private key k**) must be kept secret
  - If the key is compromised, we can rotate to a new key **k′** instead of replacing the entire ecosystem
- Keeping the design public is also crucial for security:
  - Scrutiny by design
  - Can be improved over time
  - No need for extra measures to prevent reverse engineering
  - Security effort can focus entirely on the key

**Examples:** DES, AES, SHA-3, TLS

### Adversarial Power

**What does the adversary know?**

- **Ciphertext-only attack:** Only the ciphertext is known to the adversary (eavesdropping) → _passive attack_
- **Known-plaintext attack:** Adversary has access to one or more plaintext-ciphertext pairs encrypted under the same key → _passive attack_
- **Chosen-plaintext attack (CPA):** Adversary can choose plaintexts and obtain their encryptions → _active attack_
- **Chosen-ciphertext attack (CCA):** Adversary can choose ciphertexts and request their decryption → _active attack_

**What's the adversary's computational power?**

- **Polynomial time?** (Polynomial in the security parameter **|k|**)
- **Unbounded computational power?**
- **Theoretically:**
  - Adversary can perform _poly(|k|)_ computation
  - Key space: 2^|k|
- **In practice:**
  - |k| = 64 is too short
  - |k| = 80 starts to be reasonable
- Why?
  - 2²⁰ (ops per second)
  - × 2²⁰ (seconds in two weeks)
  - × 2⁵ (fortnights in a year)
  - × 2¹⁰ (computers in parallel)
  - = **2⁵⁵** total operations — which means |k| = 80 provides ~2⁸⁰ / 2⁵⁵ = 2²⁵ margin

→ We might assume restrictions on the adversary's capabilities, but we **cannot** assume a specific attack or strategy vector.

## Breaking Enigma

- German cipher used in WWII
- Kerckhoffs's Principle applies: the allies assumed the Enigma algorithm (machine design) was known. Security relied entirely on the daily key settings, which the allies worked to recover. This is Kerckhoffs in practice — breaking the key, not the cipher.
- _Q1: What type of attack was carried out on Enigma by the allies?_
  - **Known-plaintext attack** — allies had access to some plaintext-ciphertext pairs (e.g. predictable message formats, weather reports)
  - **(Somewhat) Chosen-plaintext attack** — allies could sometimes influence what messages were sent (e.g. forcing the Germans to encrypt known content), allowing them to deduce key settings

## Schemas — History

### Caesar Cipher

- Plaintext: `ATTACK AT DAWN`
- Ciphertext: `DWWDFN DW GDZQ`
- Key k ∈ {0,…,25} (in the example, k = 3)

_Formally:_

- Key k ∈ {0,…,25}, chosen at random
- Message space: English text (i.e., letters mapped to {0,…,25})
- **Enc** algorithm: `ciphertext_letter := (plaintext_letter + k) mod 26`
- **Dec** algorithm: `plaintext_letter := (ciphertext_letter − k) mod 26`

### Brute-Force Attacks

- The adversary tests all possible keys in the key space.
- For each candidate key, they decrypt the ciphertext and check if the result is intelligible.
  - _Assumption:_ We can identify the correct plaintext among all plaintexts generated by the attack.
- Usually the key is a bit string chosen uniformly at random from {0,1}^|k|, implying **2^|k|** equi-probable keys.
- Against the Caesar cipher: only 26 possible keys — trivially breakable by exhaustive search.
