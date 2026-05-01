from hashlib import sha256
from secrets import token_hex

def password_hash(password: str) -> tuple[str, str]:
    """Takes in a password, adds salt, and returns the hash as a string"""
    # Generate 32 byte long salt
    salt: str = token_hex(32)

    # Encode string to bytes for sha256 function
    hash_input: bytes = (password + salt).encode()

    # Return hex digest of hash
    return salt, sha256(hash_input, usedforsecurity=True).hexdigest()
