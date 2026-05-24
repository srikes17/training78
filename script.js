(() => {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const togglePass = document.getElementById('togglePass');
  const demoBtn = document.getElementById('demoBtn');

  function showError(el, msg){
    el.textContent = msg || '';
  }

  function validateEmail(){
    const v = email.value.trim();
    if(!v){
      showError(emailError, 'Email is required');
      return false;
    }
    // basic email pattern
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test(v)){
      showError(emailError, 'Enter a valid email address');
      return false;
    }
    showError(emailError, '');
    return true;
  }

  function validatePassword(){
    const v = password.value;
    if(!v){
      showError(passwordError, 'Password is required');
      return false;
    }
    if(v.length < 8){
      showError(passwordError, 'Password must be at least 8 characters');
      return false;
    }
    showError(passwordError, '');
    return true;
  }

  email.addEventListener('input', validateEmail);
  password.addEventListener('input', validatePassword);

  togglePass.addEventListener('click', function(){
    const isHidden = password.type === 'password';
    password.type = isHidden ? 'text' : 'password';
    togglePass.textContent = isHidden ? 'Hide' : 'Show';
    togglePass.setAttribute('aria-pressed', String(isHidden));
  });

  demoBtn.addEventListener('click', function(){
    email.value = 'demo@example.com';
    password.value = 'password123';
    validateEmail();
    validatePassword();
  });

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    const ok1 = validateEmail();
    const ok2 = validatePassword();
    if(!ok1 || !ok2){
      formStatus.textContent = 'Please fix the errors above.';
      return;
    }

    // simulate async login
    submitBtn.disabled = true;
    const spinner = document.createElement('span');
    spinner.className = 'spinner';
    submitBtn.prepend(spinner);
    submitBtn.textContent = 'Signing in';
    submitBtn.appendChild(spinner);
    formStatus.textContent = '';

    // fake network delay
    setTimeout(()=>{
      // fake success if demo credentials used
      const success = email.value === 'demo@example.com' && password.value === 'password123';
      if(success){
        formStatus.textContent = 'Signed in successfully — redirecting...';
        // In real app: replace with location.href = '/dashboard' or similar
        setTimeout(()=>{ formStatus.textContent = 'Redirected (demo).'; submitBtn.disabled = false; submitBtn.textContent = 'Sign in'; }, 800);
      } else {
        formStatus.textContent = 'Invalid email or password.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign in';
      }
      // remove spinners if any
      const sp = submitBtn.querySelector('.spinner');
      if(sp) sp.remove();
    }, 900);
  });
})();
