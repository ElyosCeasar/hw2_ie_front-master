import axios from "axios";
class appService {
  //url = "http://localhost:5000";
  url = "http://hw2-ie-back-master.herokuapp.com";

  getAllForms = () => {
    return axios.get(this.url + "/api/forms");
  };
  getSpeceficFormById = id => {
    return axios.get(this.url + "/api/forms/" + id);
  };
  postNewForm = newForm => {
    return axios.post(this.url + "/api/forms", newForm);
  };
  postComplitedFormByClient = (ComplitedForm, id) => {
    return axios.post(this.url + "/api/forms/" + id, ComplitedForm);
  };
}

export default appService;
//https://hw2-ie-front-master.herokuapp.com/ | https://git.heroku.com/hw2-ie-front-master.git
//https://github.com/ElyosCeasar/hw2_ie_front-master
