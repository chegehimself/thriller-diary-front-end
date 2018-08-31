// call sign-up module
AddEntry = require('../app/static/js/add-entry')

describe ('Successfully add an entry to thriller-diary.herokuapp.com', () => {
    // fake data submission
    document.body.innerHTML = `
    <form id="add-form">
    <div class="group-form" id="errors">
        
    </div>
    <div class="group-form">
        <input class="form-input" type="text" id="title" name="title" maxlength="20" placeholder="eg. At NewYork " value="fakeTitle">
    </div>
    <div class="group-form">
    <p><b>Story</b></p>
    <textarea class="form-input" name="story-description" id="description" cols="30" rows="10" placeholder="A brief story" value="FakeDescription"></textarea>
    </div>
    <div>
        <button id="DoSubmission" onclick="AddEntry()" class="btn-toSign">Add</button>
    </div>
</form>
    `;
    // end of fake submission

    // fake fetch
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    
    json: () => Promise.resolve({"status": "success", "entry": {"title":"fakeTitle", "description":"FakeDescritpion"}})
    }))
    // spy on window navigation
    NavSpyMock = jest.spyOn(window.location, "assign");
    NavSpyMock.mockImplementation(() => {});

    it('successfull adds an entry to thriller-diary.herokuapp.com', async () => {
        document.getElementById('description').value = "FakeDescription";
        document.getElementById('DoSubmission').click();
        expect(Mock).toHaveBeenCalledTimes(1);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/');
        expect(Fetch[1]).toEqual({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            access_token : null
          },
          body: JSON.stringify({
              title: 'fakeTitle',
              description: 'FakeDescription',
          })
        });
        // wait for  the promise to resolve
        await Promise.resolve().then();
        expect(document.getElementById('errors').innerHTML).toBe('<h3 class="text-green">Entry added successufully!</h3>');
      });
    });
    

    it('Rejects empty title when adding new entry', async () => {

        // restore mock to initial state
        Mock.mockRestore();
        NavSpyMock.mockRestore();
        jest.resetModules();

        // fake fetch
        Mock = jest.spyOn(global, 'fetch');
        Mock.mockImplementation(() => Promise.resolve({
        
        json: () => Promise.resolve({"message": "Please input title", "status": 401})
        }))
        document.getElementById('description').value = "FakeDescription";
        document.getElementById('title').value = "";
        document.getElementById('DoSubmission').click();
        expect(Mock).toHaveBeenCalledTimes(2);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/');
        expect(Fetch[1]).toEqual({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            access_token : null
          },
          body: JSON.stringify({
              title: '',
              description: 'FakeDescription',
          })
        });
        // wait for  the promise to resolve
        await Promise.resolve().then();
        expect(document.getElementById('errors').innerHTML).toBe('<h3 class="text-red">Please input all the fields correctly</h3>');
      });

    it('Rejects invalid title when adding new entry', async () => {

        // restore mock to initial state
        Mock.mockRestore();
        NavSpyMock.mockRestore();
        jest.resetModules();

        // fake fetch
        Mock = jest.spyOn(global, 'fetch');
        Mock.mockImplementation(() => Promise.resolve({
        
        json: () => Promise.resolve({"message": "Please input valid title", "status": 401})
        }))
        document.getElementById('description').value = "FakeDescription";
        document.getElementById('title').value = "$#";
        document.getElementById('DoSubmission').click();
        expect(Mock).toHaveBeenCalledTimes(3);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/');
        expect(Fetch[1]).toEqual({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            access_token : null
          },
          body: JSON.stringify({
              title: '$#',
              description: 'FakeDescription',
          })
        });
        // wait for  the promise to resolve
        await Promise.resolve().then();
        expect(document.getElementById('errors').innerHTML).toBe('<h3 class="text-red">Please input valid title</h3>');
      });
