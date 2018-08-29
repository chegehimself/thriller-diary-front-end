// call sign-up module
signUp = require('../app/static/js/sign-up')

describe ('signs up user to thriller-diary.herokuapp.com correctly', () => {
    // fake data submission
    document.body.innerHTML += `
                                <form id="signup-form">
                                <div >
                                    
                                </div>
                                <div id="return" class="group-form">
                                    
                                </div>
                                <div class="group-form">
                                    <input type="text" id="username" class="form-input" placeholder="username" value="kamade1">
                                </div>
                                <div class="group-form">
                                    <input type="email" id="email" class="form-input" placeholder="Email" value="kamade1@gmail.com">
                                </div>
                                <div class="group-form">
                                    <input type="password" id="password" class="form-input" placeholder="Passowrd" value="1234">
                                </div>
                                <div class="group-form">
                                    <button id="DoSubmission" onclick="signUp()" class="btn-reg">Register</button>
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

    it('signs up user to thriller-diary.herokuapp.com correctly', async () => {
        document.getElementById('DoSubmission').click();
        expect(Mock).toHaveBeenCalledTimes(1);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/auth/signup');
        expect(Fetch[1]).toEqual({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              email: 'kamade1@gmail.com',
              password: '1234',
              username: 'kamade1',
          })
        });
        // wait for  the promise to resolve
        await Promise.resolve().then();
        expect(document.getElementById('return').innerHTML).toBe('<h5 class=\"text-green\">Registration Successful!</h5>');
      });
    });

it('User signs with correct username', async () => {
    // restore mock to initial state
    Mock.mockRestore();
    NavSpyMock.mockRestore();
    jest.resetModules();

    // mock fake fetch
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    
    json: () => Promise.resolve({"status": "fail", "message" : "user exists"})
    }))
    document.getElementById('username').value = '@@#BadVeryB@d';
    document.getElementById('DoSubmission').click();
    expect(Mock).toHaveBeenCalledTimes(2);
    const Fetch = Mock.mock.calls[0];
    expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/auth/signup');
    expect(Fetch[1]).toEqual({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          email: 'kamade1@gmail.com',
          password: '1234',
          username: '@@#BadVeryB@d',
      })
    });
    // wait for  the promise to resolve
    await Promise.resolve().then();
    expect(document.getElementById('return').innerHTML).toBe('<h5 class=\"text-red\">That email is already registered</h5>');
})
    
it('User signs with correct email', async () => {
    // restore mock to initial state
    Mock.mockRestore();
    NavSpyMock.mockRestore();
    jest.resetModules();

    // mock fake fetch
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    
    json: () => Promise.resolve({"status": "fail", "Message": "Invalid email.Try again"})
    }))
    document.getElementById('email').value = 'thisIsnotanEmail';
    document.getElementById('DoSubmission').click();
    expect(Mock).toHaveBeenCalledTimes(3);
    const Fetch = Mock.mock.calls[0];
    expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/auth/signup');
    expect(Fetch[1]).toEqual({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          email: 'thisIsnotanEmail',
          password: '1234',
          username: '@@#BadVeryB@d',
      })
    });
    // wait for  the promise to resolve
    await Promise.resolve().then();
    expect(document.getElementById('return').innerHTML).toBe('<h5 class=\"text-red\">Invalid email.Try again</h5>');
})

