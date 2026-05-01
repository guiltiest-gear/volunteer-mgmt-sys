import hashlib
import secrets

def password_hash(password: str) -> tuple[str, str]:
    """Takes in a password, adds salt, and returns the hash as a string"""
    # Generate 32 byte long salt
    salt: str = secrets.token_hex(32)

    # Encode string to bytes for sha256 function
    hash_input: bytes = (password + salt).encode()

    # Return hex digest of hash
    return salt, hashlib.sha256(hash_input, usedforsecurity=True).hexdigest()
