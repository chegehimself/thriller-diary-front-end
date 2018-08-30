// call ChangePassword module
ChangePassword = require('../app/static/js/change-password')
document.body.innerHTML =`
<form id="password-form">
                            <div class="btn-space" id="status">
                                    
                            </div>
                        <div class="btn-space">
                            <input class="reminder" id="old-password" type="password" name="old-password" minlength="4" placeholder="Old password" required>
                        </div>
                        <div class="btn-space">
                            <input class="reminder" id="new-password" type="password" name="password" minlength="4" placeholder="New Password" required>
                        </div>
                        <div class="btn-space">
                            <input class="reminder" id="confirmation" type="password" name="confirmation" minlength="4" placeholder="confirm" required>
                        </div>
                        <div class="btn-space">
                                <button id="btn-toSign" onclick="ChangePassword()">Reset</button>
                        </div>
                    </form>`;
describe ('Successfully updates the user password at from thriller-diary.herokuapp.com', () => {
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({"status": "success",
    "entry": {"Message":"Password Updated successfully"}})
    }))
    // spy on window navigation
    NavSpyMock = jest.spyOn(window.location, "assign");
    NavSpyMock.mockImplementation(() => {});

    it('successfull updates a certain entry from thriller-diary.herokuapp.com', async () => {
        document.getElementById('btn-toSign').click();
        expect(Mock).toHaveBeenCalledTimes(1);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/users/profile');
        expect(Fetch[1]).toEqual({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token : null
          }
        });
        // wait for  the promise to resolve
        // await Promise.resolve().then();
        expect(document.getElementById('status').innerHTML).toBe('<h3 class=\"text-blue\">Processing...</h3>');
      });
    //   it('checks if old password is correct', async () => {
    //     // restore mock to initial state
    //     Mock.mockRestore();
    //     NavSpyMock.mockRestore();
    //     jest.resetModules();

    //     // spy on window navigation
    //     NavSpyMock = jest.spyOn(window.location, "assign");
    //     NavSpyMock.mockImplementation(() => {});

    //     Mock = jest.spyOn(global, 'fetch');
    //     Mock.mockImplementation(() => Promise.resolve({
    //     json: () => Promise.resolve({"status":"fail", "message":"Please input valid title"})
    //     }))
    //     window.history.pushState({}, 'delete', 'http://thriller-diary.herokuapp/entries/1');
    //     entryId = Number(location.pathname.match(/\d+/)[0]);
    //     document.getElementById('updater').click();
    //     expect(Mock).toHaveBeenCalledTimes(2);
    //     const Fetch = Mock.mock.calls[0];
    //     expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/1');
    //     expect(Fetch[1]).toEqual({
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         access_token : null
    //       },
    //       body: JSON.stringify({
    //           title: "newTittle",
    //           description: 'newDescription',
    //       }) 
    //     });
    //     // wait for  the promise to resolve
    //     await Promise.resolve().then();
    //     expect(document.getElementById('errors').innerHTML).toBe('<h5 class=\"text-red\">Please input valid title!</h5>');
    //   });

    //   it("makes sure that title and description are loaded in form fields", async () => {
    //     // restore mock to initial state
    //     Mock.mockRestore();
    //     NavSpyMock.mockRestore();
    //     jest.resetModules();

    //     Mock = jest.spyOn(global, 'fetch');
    //     Mock.mockImplementation(() => Promise.resolve({
    //     json: () => Promise.resolve({"status": "success", "entry": {"id":1,
    //     "title":"fakeTittle",
    //     "description":"fakeDescription",
    //     "created":"30/08/2018"}})
    //     }))

    //     // spy on window navigation
    //     NavSpyMock = jest.spyOn(window.location, "assign");
    //     NavSpyMock.mockImplementation(() => {});
        
    //     // load the window
    //     require('../app/static/js/modify')
    //     window.document.dispatchEvent(new Event("DOMContentLoaded", {
    //         bubbles: true,
    //         cancelable: true
    //       }));
    //         expect(Mock).toHaveBeenCalledTimes(2);
    //         const Fetch = Mock.mock.calls[0];
    //         expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/1');
    //         expect(Fetch[1]).toEqual({
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //             access_token: null
    //           }
    //         })
    //         await Promise.resolve().then();
    //         expect(document.getElementById('title').value).toBe('fakeTittle');
    //         expect(document.getElementById('description').value).toBe('fakeDescription');
    //   });

    //   it('updates a certain entry with a valid title at thriller-diary.herokuapp.com', async () => {
    //     // restore mock to initial state
    //     Mock.mockRestore();
    //     NavSpyMock.mockRestore();
    //     jest.resetModules();

    //     // spy on window navigation
    //     NavSpyMock = jest.spyOn(window.location, "assign");
    //     NavSpyMock.mockImplementation(() => {});

    //     Mock = jest.spyOn(global, 'fetch');
    //     Mock.mockImplementation(() => Promise.resolve({
    //     json: () => Promise.resolve({})
    //     }))
    //     window.history.pushState({}, 'delete', 'http://thriller-diary.herokuapp/entries/1');
    //     entryId = Number(location.pathname.match(/\d+/)[0]);
    //     document.getElementById('updater').click();
    //     expect(Mock).toHaveBeenCalledTimes(3);
    //     const Fetch = Mock.mock.calls[0];
    //     expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/1');
    //     expect(Fetch[1]).toEqual({
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         access_token : null
    //       },
    //       body: JSON.stringify({
    //           title: "fakeTittle",
    //           description: "fakeDescription",
    //       }) 
    //     });
    //     // wait for  the promise to resolve
    //     await Promise.resolve().then();
    //     expect(document.getElementById('errors').innerHTML).toBe('<h3 class=\"text-blue\">Processing...</h3>');
    //   });
 });
