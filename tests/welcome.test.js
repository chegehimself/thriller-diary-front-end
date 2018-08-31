describe ('Successfully loads the homepage thriller-diary.herokuapp.com', () => {
    document.body.innerHTML = `<div id="welcoming-message"></div><div id="date"></div><div id="description"></div>`;
    Mock = jest.spyOn(global, 'fetch');
    // all_user_entries = [{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is a fakeentry"},{id:2, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"},{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is another fakeentry"}];
    // all_user_entries = [{id:1, title:"fakeTitle", date_created:"30/08/2018", description:"this is a fakeentry"}];
    Mock = jest.spyOn(global, 'fetch');
    welcome_message = {
        "Welcome":"Hey! welcome to thriller diary api"
        }
    Mock.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({"status": "success", "Message": welcome_message})
    }))
    // spy on window navigation
    NavSpyMock = jest.spyOn(window.location, "assign");
    NavSpyMock.mockImplementation(() => {});
  it("makes sure that homepage is loaded", async () => {

    require('../app/static/js/welcome')
    window.document.dispatchEvent(new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true
      }));
        expect(Mock).toHaveBeenCalledTimes(1);
        const Fetch = Mock.mock.calls[0];
        expect(Fetch[0]).toBe('//api-thriller-diary.herokuapp.com/api/v1/auth/');
        expect(Fetch[1]).toEqual({
          method: "GET"
        })
        await Promise.resolve().then();
        expect(document.getElementById('welcoming-message').innerHTML).toMatch("<p class=\"text-white\">");
  });
});