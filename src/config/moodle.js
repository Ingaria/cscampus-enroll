import axios from 'axios';

var WebServiceUrl = process.env.MDL_DOMAIN + "webservice/rest/server.php";

export const queryMoodleUser = async (email) => {
    const params = new URLSearchParams();
    params.append('moodlewsrestformat', 'json');
    params.append('wsfunction', 'core_user_get_users');
    params.append('wstoken', process.env.MDL_TOKEN);
    params.append('criteria[0][key]', 'email');
    params.append('criteria[0][value]', email);
    var config = {
        method: 'get',
        url: WebServiceUrl,
        headers: {},
        params :  params
      };

    let res = await axios(config)
    return res;

}

export const createMoodleUser = async (user) => {
    //console.log(user);
    const params = new URLSearchParams();
    params.append('moodlewsrestformat', 'json');
    params.append('wsfunction', 'core_user_create_users');
    params.append('wstoken', process.env.MDL_TOKEN);
    params.append('users[0][username]', user.username);
    params.append('users[0][createpassword]', 1);
    params.append('users[0][firstname]', user.firstname);
    params.append('users[0][lastname]', user.lastname);
    params.append('users[0][institution]', user.institution);
    params.append('users[0][country]', user.country);
    params.append('users[0][phone1]', user.phone);
    params.append('users[0][email]', user.email);
    params.append('users[0][idnumber]', 'AUTOGENERATEDID002');
    params.append('users[0][description]', 'auto-generated');
    params.append('users[0][lang]', 'en');
    var config = {
        method: 'post',
        url: WebServiceUrl,
        headers: {},
        params :  params
    };

    let res = await axios(config)
    return res;
}

export const enrollMoodleuser = async (userId, courseId, timestart, timeend) => {
    const params = new URLSearchParams();
    params.append('moodlewsrestformat', 'json');
    params.append('wsfunction', 'enrol_manual_enrol_users');
    params.append('wstoken', process.env.MDL_TOKEN);
    params.append('enrolments[0][roleid]', '5');
    params.append('enrolments[0][userid]', userId);
    params.append('enrolments[0][courseid]', courseId);
    params.append('enrolments[0][timestart]', timestart);
    params.append('enrolments[0][timeend]', timeend);
    params.append('enrolments[0][suspend]', '0'); //Este valor se puede usar para automatizar la extensión de matrícula

    var config = {
        method: 'post',
        url: WebServiceUrl,
        headers: {},
        params :  params
      };

    let res = await axios(config)
    return res;
}

export const addUserToMoodleGroup = async (userId, groupid) => {
    const params = new URLSearchParams();
    params.append('moodlewsrestformat', 'json');
    params.append('wsfunction', 'core_group_add_group_members');
    params.append('wstoken', process.env.MDL_TOKEN);
    params.append('members[0][groupid]', groupid); //id del grupo al cual se espera incluir al usuario
    params.append('members[0][userid]', userId);

    var config = {
        method: 'post',
        url: WebServiceUrl,
        headers: {},
        params :  params
      };

    let res = await axios(config)
    return res;
}
