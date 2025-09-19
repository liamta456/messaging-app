const supabase = require('../supabaseClient');

const register = async (req, res) => {
    console.log('Registering user...');
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.error('Registration failed: missing email or password.');
            return res.status(400).json({ error: 'Registration failed: missing email or password.' });
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (signUpError) {
            console.error(`Registration failed: ${signUpError.message}`);
            return res.status(400).json({ error: signUpError.message });
        }

        console.log('Registration successful.');
        res.status(201).json({
            message: 'Registration successful.'
         });
    } catch (error) {
        console.error(`Registration failed: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};


const login = async (req, res) => {
    console.log('Logging in user...');
    
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.error('Login failed: missing email or password.');
            return res.status(400).json( { error: 'Login failed: missing email or password.' });
        }
        
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (loginError) {
            console.error(`Login failed: ${loginError.message}`);
            return res.status(400).json({ error: loginError.message });
        }

        console.log('Login successful.');
        res.status(200).json({
            message: 'Login successful.',
            data: data.user,
            session: data.session
        });
    } catch (error) {
        console.error(`Login failed: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };