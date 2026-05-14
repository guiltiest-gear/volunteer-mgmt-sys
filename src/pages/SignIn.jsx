import { useState } from 'preact/hooks';

export function SignIn() {
	const [message, setMessage] = useState('');

	/** @param {Event} event */
	function handleSubmit(event) {
		event.preventDefault();
		setMessage('Signed in successfully!');
	}

	return (
		<div class="signin-container">
			<h2>Login</h2>

			<form id="signinForm" onSubmit={handleSubmit}>
				<input type="email" id="email" placeholder="Email" required />
				<input type="password" id="password" placeholder="Password" required />

				<a href="#" class="forgot" onClick={(event) => event.preventDefault()}>
					Forgot password?
				</a>

				<button type="submit">Sign In</button>
			</form>

			<p id="message">{message}</p>
		</div>
	);
}
