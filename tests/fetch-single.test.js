describe ('Successfully delete an entry from thriller-diary.herokuapp.com', () => {
    document.body.innerHTML = `<div id="title"></div><div id="date"></div><div id="description"></div>`;
    Mock = jest.spyOn(global, 'fetch');
    // all_user_entries = [{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is a fakeentry"},{id:2, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"}];
    // all_user_entries = [{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is a fakeentry"}];
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({"status": "success", "entry": {"id":1,
    "title":"fakeTittle",
    "description":"fakeDescription",
    "created":"30/08/2018"}})
    }))
    // spy on window navigation
    NavSpyMock = jest.spyOn(window.location, "assign");
    NavSpyMock.mockImplementation(() => {});
  it("makes sure that a single entry is loaded", async () => {

    require('../app/static/js/single')
    window.document.dispatchEvent(new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true
      }));
        expect(Mock).toHaveBeenCalledTimes(1);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/entries/1');
        expect(Fetch[1]).toEqual({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: null
          }
        })
        await Promise.resolve().then();
        expect(document.getElementById('title').innerHTML).toBe("<h2>fakeTittle</h2>");
        expect(document.getElementById('description').innerHTML).toBe("<p>fakeDescription</p>");
  });
});