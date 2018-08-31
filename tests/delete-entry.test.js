// call sign-up module
DeleteEntry = require('../app/static/js/delete_entry')
document.body.innerHTML += `
<div id="errors" class="group-form">
</div>
<div class="text-right group-form">
    <button class="btn-reg delete-ent click-off" id="Del" onclick="DeleteEntry()">Delete</button>
</div>`;
describe ('Successfully delete an entry from thriller-diary.herokuapp.com', () => {
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({"status":"success", "Deleted":"id"})
    }))
    // spy on window navigation
    NavSpyMock = jest.spyOn(window.location, "assign");
    NavSpyMock.mockImplementation(() => {});

    it('successfull deletes a certain entry from thriller-diary.herokuapp.com', async () => {
        window.history.pushState({}, 'delete', 'http://thriller-diary.herokuapp/entries/1');
        entryId = Number(location.pathname.match(/\d+/)[0]);
        document.getElementById('Del').click();
        expect(Mock).toHaveBeenCalledTimes(1);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/1');
        expect(Fetch[1]).toEqual({
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token : null
          }
        });
        // wait for  the promise to resolve
        await Promise.resolve().then();
        expect(document.getElementById('errors').innerHTML).toBe('<h5 class=\"text-green\">Entry Deleted!</h5>');
      });

      it('Delete failure on entry at thriller-diary.herokuapp.com', async () => {
        // restore mock to initial state
        Mock.mockRestore();
        NavSpyMock.mockRestore();
        jest.resetModules();

        // mock fake fetch
        Mock = jest.spyOn(global, 'fetch');
        Mock.mockImplementation(() => Promise.resolve({
        
        json: () => Promise.resolve({"status":"fail", "message":"not found"})
        }))
        window.history.pushState({}, 'delete', 'http://thriller-diary.herokuapp/entries/1');
        entryId = Number(location.pathname.match(/\d+/)[0]);
        document.getElementById('Del').click();
        expect(Mock).toHaveBeenCalledTimes(1);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/1');
        expect(Fetch[1]).toEqual({
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token : null
          }
        });
        // wait for  the promise to resolve
        await Promise.resolve().then();
        expect(document.getElementById('errors').innerHTML).toBe('<h5 class=\"text-red\">Entry Not found!</h5>');
      });
    });
    

    it('catchs errors on failure delete entry at thriller-diary.herokuapp.com', async () => {
      // restore mock to initial state
      Mock.mockRestore();
      NavSpyMock.mockRestore();
      jest.resetModules();

      // mock fake fetch
      Mock = jest.spyOn(global, 'fetch');
      Mock.mockImplementation(() => Promise.resolve({
      
      json: () => Promise.resolve()
      }))
      window.history.pushState({}, 'delete', 'http://thriller-diary.herokuapp/entries/1');
      entryId = Number(location.pathname.match(/\d+/)[0]);
      document.getElementById('Del').click();
      expect(Mock).toHaveBeenCalledTimes(1);
      const Fetch = Mock.mock.calls[0];
      expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/1');
      expect(Fetch[1]).toEqual({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token : null
        }
      });
      // wait for  the promise to resolve
      await Promise.resolve().then();
      expect(document.getElementById('errors').innerHTML).toBe('<h5 class=\"text-red\">Entry Not found!</h5>');
    });  