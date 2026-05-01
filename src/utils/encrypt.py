from hashlib import sha256
from secrets import token_hex

def password_hash(password: str) -> tuple[str, str]:
    """
    Return a tuple of the salt and hashed password.

    The first element is the salt, and the second is the hex digest,
    both of them being strings.
    """
    # Generate 32 byte long salt
    salt: str = token_hex(32)

    # Concatenate and encode password and salt strings to bytes for sha256 function
    hash_input: bytes = (password + salt).encode()

    # Return hex digest of hash
    return salt, sha256(hash_input, usedforsecurity=True).hexdigest()
