'use client';

import api from '@/lib/axios';

//Check if server response is success or error
function isSuccess(statusNum: number): boolean{
    return (statusNum>=200 && statusNum<300);
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Pre-check of CSRF before making server requests
async function checkCsrf(){
    //XSRF-TOKEN=
    const hasXsrf: boolean = await document.cookie
        .split('; ')
        .some(cookie => cookie.startsWith('XSRF-TOKEN='));

    if (!hasXsrf){
        api.get('/sanctum/csrf-cookie',{withCredentials: true});
    }
    //api.get('/sanctum/csrf-cookie'); //to check if repeated refresh is needed or not

}

//list of react components need to be updated
export type ReactState_ = {reactFunction: ((arg0: string) => void), dataColumn: string}
const ReactStateCompnentList: ReactState_[] = [];
export function registerReactComp(stateHolder: ReactState_){
    ReactStateCompnentList.push(stateHolder);
}
function setReactState(){

    let JSONData;

    if (isLoggedIn()){
        JSONData = JSON.parse(localStorage.getItem('userData') as string); 
    } else {
        JSONData = {
            username: 'Login',
            name: 'Login',
            email: 'Login',
        }
    }

    ReactStateCompnentList.forEach(element => {
        
        switch (element.dataColumn) {
            case 'username':
                element.reactFunction(JSONData.username)
                break;
            case 'name':
                element.reactFunction(JSONData.name)
                break;
            case 'email':
                element.reactFunction(JSONData.email)
                break;
            default:
                element.reactFunction('INVALID_COLUMN')
                break;
        }

    });
}

export async function loginUser(email: string, passwd: string){

    await checkCsrf()

    await delay(2000);//To give server time to process Csrf before login flow

    const dataStream = await api.post('/login', {
        email: email,
        password: passwd
    });

    if (isSuccess(dataStream.status)) getUser();

    return await dataStream.data;

}

export async function sanityTest(): Promise<string> {
    
    await checkCsrf()

    try {
        const dataStream = await api.get('/test');
        return JSON.stringify(dataStream.data);
    } catch (error) {
        return (error instanceof Error)? (`${error.name}: ${error.message}`) : String(error) 
    }

}

//Checks if user is logged in
export function isLoggedIn(): boolean {
    return localStorage.getItem('userData')!==null;
}

export async function getUser() {
    
    await checkCsrf();

    const dataStream = await api.get('/user', {
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true
    });

    //Save user data to browser for easier loading
    if (isSuccess(dataStream.status)) await localStorage.setItem('userData', JSON.stringify(dataStream.data));

    //For React components
    setReactState();

    return dataStream.data;

}

export async function registerUser(name: string, email: string, username: string, pwd1: string, pwd2: string){

    await checkCsrf()

    const dataStream = await api.post('/register', {
        name: name,
        email: email,
        username: username,
        password: pwd1,
        password_confirmation: pwd2
    });

    return dataStream.data;

}

export async function logoutUser() {
    
    await checkCsrf();

    const dataStream = await api.post('/logout');

    //Clear storage on successful logout
    if (isSuccess(dataStream.status)) localStorage.clear();

    setReactState();

    return dataStream.data;

}


export async function sendNewGameReview(gameid: string, rating: number, title?: string, comment?: string){

    await checkCsrf();

    const userData_id = JSON.parse(localStorage.getItem('userData') as string).id;

    const dataStream = await api.post('/api/reviews',{
        userid: userData_id,
        gameid: Number(gameid),
        rating: rating,
        title: (title) ? title : null,
        comment: comment ? comment : null,
    });

    return dataStream.data;

}

//for reviewing and deleting reviews
export async function getUsersGameReviews() {

    await checkCsrf();

    const userData_id = JSON.parse(localStorage.getItem('userData') as string).id;

    const dataStream = await api.get(`/api/reviews/user/${userData_id}`);

    return dataStream.data;

    
}

export async function deleteGameReview(reviewid:number){

    await checkCsrf();
    const dataStream = await api.delete(`/api/reviews/${reviewid}`);
    return dataStream.data;

}