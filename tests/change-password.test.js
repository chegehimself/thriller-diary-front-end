// call ChangePassword module
ChangePassword = require('../app/static/js/change-password')
require('../app/static/js/change-password')
document.body.innerHTML =`
<form id="password-form">
                            <div class="btn-space" id="status">
                                    
                            </div>
                        <div class="btn-space">
                            <input class="reminder" id="old-password" type="password" name="old-password" minlength="4" placeholder="Old password" value="oldie">
                        </div>
                        <div class="btn-space">
                            <input class="reminder" id="new-password" type="password" name="password" minlength="4" placeholder="New Password" value="newie">
                        </div>
                        <div class="btn-space">
                            <input class="reminder" id="confirmation" type="password" name="confirmation" minlength="4" placeholder="confirm" value="confie">
                        </div>
                        <div class="btn-space">
                                <button id="btn-toSign" onclick="ChangePassword()">Reset</button>
                        </div>
                    </form>`;
describe ('Successfully updates the user password at from thriller-diary.herokuapp.com', () => {
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({"status": "success", "Profile": {"id":1,
        "username":"fakeUsername",
        "email":"fakeEmail"}})
        }))

    it('successfull updates a certain user password at thriller-diary.herokuapp.com', async () => {
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
        await Promise.resolve().then();
        expect(document.getElementById('status').innerHTML).toBe('<h3 class=\"text-blue\">Processing...</h3>');
      });

      it('rejects wrong old password at thriller-diary.herokuapp.com', async () => {
        document.getElementById('btn-toSign').click();
        expect(Mock).toHaveBeenCalledTimes(4);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/users/profile');
        expect(Fetch[1]).toEqual({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token : null
          }
        });
        Mock = jest.spyOn(global, 'fetch');
        Mock.mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({"status":"fail", "message":"Incorrect old password"})
            }))

            console.log(Mock.mock.calls);
        // wait for  the promise to resolve
        await Promise.resolve().then();
        expect(document.getElementById('status').innerHTML).toBe('<h3 class=\"text-blue\">Processing...</h3>');
      });


      it('rejects mistmatching password at thriller-diary.herokuapp.com', async () => {
        document.getElementById('btn-toSign').click();
        expect(Mock).toHaveBeenCalledTimes(9);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/users/profile');
        expect(Fetch[1]).toEqual({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token : null
          }
        });
        Mock = jest.spyOn(global, 'fetch');
        Mock.mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({"status":"fail", "message":"Password mismatch"})
            }))
        // wait for  the promise to resolve
        await Promise.resolve().then();
        expect(document.getElementById('status').innerHTML).toBe('<h3 class=\"text-blue\">Processing...</h3>');
      });
 });
