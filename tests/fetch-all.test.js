describe ('Successfully delete an entry from thriller-diary.herokuapp.com', () => {
    document.body.innerHTML = `
    <table id="table">
    <tbody id="tbody">
    </tbody>
    </table>`;
    Mock = jest.spyOn(global, 'fetch');
    // all_user_entries = [{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is a fakeentry"},{id:2, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"}];
    // all_user_entries = [{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is a fakeentry"}];
    all_user_entries = [];
    Mock.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({"status": "success", "Entries": all_user_entries})
    }))
    // spy on window navigation
    NavSpyMock = jest.spyOn(window.location, "assign");
    NavSpyMock.mockImplementation(() => {});

it("makes sure that all entries are loaded", async () => {
    // load the window
    require('../app/static/js/fetch-all')
    window.document.dispatchEvent(new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true
      }));
        expect(Mock).toHaveBeenCalledTimes(1);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/');
        expect(Fetch[1]).toEqual({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: null
          }
        })
        await Promise.resolve().then();
        expect(document.getElementById('tbody').innerHTML).toBe("<div><p>Your entries will appear here</p></div>");
  });

  it("makes sure that all entries are loaded", async () => {
    // restore mock to initial state
    Mock.mockRestore();
    NavSpyMock.mockRestore();
    jest.resetModules();

    all_user_entries = [{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is a fakeentry"}];
    // mock fake fetch
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    
    json: () => Promise.resolve({"status": "success", "Entries": all_user_entries})
    }))

    require('../app/static/js/fetch-all')
    window.document.dispatchEvent(new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true
      }));
        expect(Mock).toHaveBeenCalledTimes(2);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/');
        expect(Fetch[1]).toEqual({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: null
          }
        })
        await Promise.resolve().then();
        expect(document.getElementById('tbody').innerHTML).toMatch(" <td class=\"tdata\">fakeTitle</td>");
        expect(document.getElementById('tbody').innerHTML).toMatch(" <td class=\"tdata\">30/08/2018</td>");
        expect(document.getElementById('tbody').innerHTML).toMatch(" <td class=\"edit tdata\"><li><a href=\"/modify/1\"> Edit</a></li></td>");
        expect(document.getElementById('tbody').innerHTML).toMatch(" <td class=\"view tdata\"><li><a href=\"/view/1\"> View</a></li></td>");
  });

});