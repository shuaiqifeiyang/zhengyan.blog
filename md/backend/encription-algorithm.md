---
{
  "title": "Common Encryption Algorithms",
  "draft": false,
  "created_at": "2019-05-06",
  "category": "Backend",
  "tags": ["Cryptgraphy"],
  "description": "Introduction to common encryption algorithms and their usage."
}
---



## 1. Hash Algorithm

Hash Algorithm can generate unique value to each unique input, and it's infeasible to reverse the process; that is, given a hash value, it should be computationally infeasible to find the original input.

Hash functions are widely used in various applications:

- **Data Integrity**: Verifying the integrity of data by comparing hash values.
- **Password Hashing**: Storing passwords securely by hashing them and storing the hash value.

| Algorithm Name                                | Input                                          | Output              | Security   | Application                                                  |
| --------------------------------------------- | ---------------------------------------------- | ------------------- | ---------- | ------------------------------------------------------------ |
| MD5                                           | Unlimited Length                               | 128-bit (16 bytes)  | Not secure | MD5 can be used as a checksum to verify data integrity against **unintentional corruption**. |
| SHA-1                                         | $$2^{64}-1$$bits                               | 160-bit (20 bytes)  | Not secure | The same as MD5                                              |
| SHA-2 (**SHA-256**, SHA-384, SHA-512,SHA-224) | $$2^{64}-1$$bits                               | Based on the suffix | Secure     |                                                              |
| SHA-3 (Keccak)                                | Unlimited Length                               | Variable            | Secure     |                                                              |
| BLAKE                                         | BLAKE2b-$$(2^{128}-1)$$,BLAKE2s-$$(2^{64}-1)$$ | Variable            | Secure     |                                                              |

**Speed**: MD5 > SHA1 > SHA2 > SHA3

If speed is a critical factor and security requirements allow, MD5 and BLAKE (especially BLAKE2) are among the fastest. However, given the security issues with MD5 and to a lesser extent SHA-1, BLAKE2 often represents the best balance of speed and security among these options.

## 2. Symmetric Encryption Algorithm

A symmetric encryption algorithm is a type of encryption where the same key is used for both encryption and decryption of data.

| Algorithm | Block Size (bits) | Key Size (bits) | Security Considerations                                      | Typical Use Cases                                            |
| --------- | ----------------- | --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **AES**   | 128               | 128/192/256     | Highly secure, resistant to known attacks; standard for encryption | Data encryption in databases, software applications, and communication protocols |
| ~~DES~~*  | ~~64~~            | ~~56~~          | ~~No longer considered secure due to short key length and susceptibility to brute-force attacks~~ | ~~Legacy applications, replaced by AES~~                     |
| ~~3DES~~* | ~~64~~            | ~~112/168~~     | ~~More secure than DES, but slower and vulnerable to certain attacks; being phased out~~ | ~~Legacy applications, transitioning to AES~~                |
| Blowfish  | 64                | 32 to 448       | Secure, but has some theoretical vulnerabilities; faster than AES in some implementations | File encryption, legacy systems not supporting AES           |
| Twofish   | 128               | 128/192/256     | Considered secure, no effective attacks known; finalist in the AES competition | Alternative to AES where a non-NIST standard is desired      |
| RC4       | Stream cipher     | 40 to 2048      | Vulnerable to several serious attacks, not recommended for new systems | Formerly used in SSL and WEP, now largely replaced by stronger algorithms |
| ChaCha20  | Stream cipher     | 256             | Considered very secure and fast, especially on platforms without AES-NI | Used in VPNs, TLS, and file encryption                       |

*DES and 3DES are obsolete due to their vulnerabilities, so we are not going to cover them here.

## 3. Asymmetric Algorithm

An asymmetric encryption algorithm, also known as public-key encryption, uses a pair of keys for encryption and decryption: a public key and a private key

| Algorithm                         | Key Size (bits) | Security Considerations                                      | Typical Use Cases                                            | Relative Speed |
| --------------------------------- | --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------- |
| RSA                               | 1024 to 4096    | Secure at higher key sizes (2048+); susceptible to quantum attacks | Digital signatures, secure data transmission, encryption     | Slow           |
| ECC (Elliptic Curve Cryptography) | 160 to 521      | Provides higher security per bit than RSA; resistant to some attacks that affect RSA | Secure mobile communications, lightweight cryptography       | Fast           |
| DSA (Digital Signature Algorithm) | 1024 to 3072    | Primarily used for digital signatures; not for encryption    | Digital signatures in software distribution, document signing | Moderate       |
| ElGamal                           | Similar to DH   | Provides both encryption and digital signature capabilities; computationally intensive | Secure email, file encryption                                | Slow           |

## 4. Key Exchange

A key exchange algorithm is a cryptographic protocol designed to securely exchange cryptographic keys between parties over a public or insecure channel. [Diffie–Hellman key exchange](https://en.wikipedia.org/wiki/Diffie–Hellman_key_exchange) and [Elliptic-curve Diffie–Hellman](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie–Hellman) are common Key Exchange
