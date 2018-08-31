// call sign-up module
signIn = require('../app/static/js/sign-in')

describe ('signs in user to thriller-diary.herokuapp.com correctly', () => {
    // fake data submission
    document.body.innerHTML += `
                                <form id="signin-form">
                                    <div id="return" class="group-form">
                                        
                                    </div>
                                    <div class="group-form">
                                        <input type="email" id="email" class="form-input" placeholder="Email" value="kamade1@gmail.com">
                                    </div>
                                    <div class="group-form">
                                        <input type="password" id="password" class="form-input" placeholder="Passowrd" value="1234">
                                    </div>
                                    <div class="group-form">
                                        <button id="DoSubmission" onclick="signIn()" class="btn-reg">Sign In</button>
                                    </div>
                                </form>
    `;
    // end of fake submission

    // fake fetch
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    
    json: () => Promise.resolve({"status": "success"})
    }))
    // spy on window navigation
    NavSpyMock = jest.spyOn(window.location, "assign");
    NavSpyMock.mockImplementation(() => {});

    it('signs in user to thriller-diary.herokuapp.com correctly', async () => {
        document.getElementById('DoSubmission').click();
        expect(Mock).toHaveBeenCalledTimes(1);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/auth/login');
        expect(Fetch[1]).toEqual({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              email: 'kamade1@gmail.com',
              password: '1234',
          })
        });
        // wait for  the promise to resolve
        await Promise.resolve().then();
        expect(document.getElementById('return').innerHTML).toBe('<h5 class="text-green">Login successful!</h5>');
      });
    });
    
it('User signs with correct login details', async () => {
    // restore mock to initial state
    Mock.mockRestore();
    NavSpyMock.mockRestore();
    jest.resetModules();

    // mock fake fetch
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    
    json: () => Promise.resolve({"status":"fail", "message":"Oops! check your details and try again"})
    }))
    document.getElementById('email').value = 'wrong@gmail.com';
    document.getElementById('DoSubmission').click();
    expect(Mock).toHaveBeenCalledTimes(2);
    const Fetch = Mock.mock.calls[0];
    expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/auth/login');
    expect(Fetch[1]).toEqual({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          email: 'wrong@gmail.com',
          password: '1234',
      })
    });
    // wait for  the promise to resolve
    await Promise.resolve().then();
    expect(document.getElementById('return').innerHTML).toBe('<h5 class=\"text-red\">Oops! check your details and try again</h5>');
})


it('checks for very short password during sign-in', async () => {
    // restore mock to initial state
    Mock.mockRestore();
    NavSpyMock.mockRestore();
    jest.resetModules();

    // mock fake fetch
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    
    json: () => Promise.resolve({"status": "fail", "Message": "Too short password(at least 4 characters needed)"})
    }))
    document.getElementById('password').value = '12';
    document.getElementById('email').value = 'kamade1@gmail.com';
    document.getElementById('DoSubmission').click();
    expect(Mock).toHaveBeenCalledTimes(3);
    const Fetch = Mock.mock.calls[0];
    expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/auth/login');
    expect(Fetch[1]).toEqual({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          email: 'kamade1@gmail.com',
          password: '12',
      })
    });
    // wait for  the promise to resolve
    await Promise.resolve().then();
    expect(document.getElementById('return').innerHTML).toBe('<h5 class=\"text-red\">Too short password(at least 4 characters needed)</h5>');
})

it('Checks for that email and password were provided during sign-in', async () => {
    // restore mock to initial state
    Mock.mockRestore();
    NavSpyMock.mockRestore();
    jest.resetModules();

    // mock fake fetch
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    
    json: () => Promise.resolve({"status": "fail", "Message": "Check your details and try again"})
    }))
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('DoSubmission').click();
    expect(Mock).toHaveBeenCalledTimes(4);
    const Fetch = Mock.mock.calls[0];
    expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/auth/login');
    expect(Fetch[1]).toEqual({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          email: '',
          password: '',
      })
    });
    // wait for  the promise to resolve
    await Promise.resolve().then();
    expect(document.getElementById('return').innerHTML).toBe('<h5 class=\"text-red\">Check your details and try again</h5>');
})
