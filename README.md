# openMic App Client-side  
##### by MANSA SAMLAFO 

![Image](./src/Assets/OpenMic-Logo-lg.png "icon")  

## Table of Contents
- [About openMic](#About_openMic)
- [Built With](#Built_with)
- [Project Planning](#Project_Planning)
- [Key Features](#Key_Features)
- [Run app on Computer](#Run_app_on_Computer)
- [Planning Tools](#Planning_Tools)

### About openMic
openMic is a poetry app or media, built to share and showcase poetic talent of all kinds. 

### Built With
---------------
1. Node was used to build the server portion of the app.
2. React was used for building the front-end for high responsiveness.
3. Bootstrap and ReactStrap gave the front-end a professional look.
4. Browser Router Dom made navigation quick and easy through the app.

## Project Planning:
Trello was used through the planning and creation stages of the project to list out all the tasks. diagram.io was used to provide the structure and detailed information flow of all the components of opemMic. Wireframes were completed via hand sketching. The server endpoints were tested with Postman. Links to project planning and diagram.io are listed below this page.

## Key Features
The server side with all its endpoints was first built out. Verification and creation of tokens and JWT_SECRET were incorporated to improve the security of the application and minimize unauthorized processes on the app. 

A user can gain access to the app by either logging in or signing up. He is then able to create poem(s), view poems, comment on poems created by other users. Another functionality that exist in the app is the ability of the user to request publication of his poem. This makes the poem public to openMic. Without publication, all poems a user creates are only visible to that user. There is also the existence of the profile section which the user has the option of completing. All data is being stored inthe database.

Without signing in a guest user only has the ability to see poems openMic users but cannot create or comment on a poem.

An admin role in openMic provides additional rights to the admin user such as viewing all users as well as viewing and deciding on a resolution for all poems which have been flagged by other users asp plagerised or poams that are not original to the author. The admin also has the ability to delete poems and suspend user accounts where necessary.


## Run app on Computer
To run the application on your computer follow the below instructions:
1. Clone the project from GitHub
2. Open up Visual Studio and paste the link in your command prompt(for mac) or powershell(for windows computer)
3. Run the command "npm init" in the folder created.
4. Then run "npm update" and "npm start" to start the application.

### Planning tools

* Click [openMic diagram.io flow diagram](https://app.diagrams.net/#G1YaAGBeguXZqIiQGxvRm6kFtjt595oe96)

* Click [openMic Tello board](https://trello.com/b/SnWtS2Li/openmic)

                                
                                <Elevenfifty Academy © MDS 2021>
                              