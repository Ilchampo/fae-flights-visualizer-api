# Database Design
**Database Engine:** MongoDb
**Version:** 1.0.0
**Date:** June 6th, 2022

## Description
For the current version of the project, we choose MongoDb as database engine. The reason behind this decision is due the flexibility of the database engine. This is thanks to being a document-based database instead of a relational database. For development purposes, the database will be stored on Mongo Atlas cloud service. To access the database please contact the following email:
```beltran.juan@udla.edu.ec```

## Collections
**User**
Collection that stores the information about the users registered on the application.
| Data Type | Name       | Description                                                            |
|-----------|------------|------------------------------------------------------------------------|
| Object Id | id         | Identifier of the document.                                            |
| String    | role       | Defines the role of the current user. This is used for app permission. |
| String    | firstName  | Field for the user first name.                                         |
| String    | lastName   | Field for the user last name.                                          |
| String    | email      | Field for the user email.                                              |
| String    | password   | Field for the user password.                                           |
| Date      | createDate | Field that contains when the user was created.                         |
| Boolean   | isActive   | Defines if the user is active or not to access the application.        |

**Flight**
Collection that stores the information about each flight that has been loaded to the application.
| Data Type | Name        | Description                                                            |
|-----------|-------------|------------------------------------------------------------------------|
| Object Id | id          | Identifier of the document.                                            |
| Object Id | createdBy   | Stores the object id of the user who created this flight.              |
| Object Id | coordinates | Stores the object id of the coordinates file to be read on the report. |
| Object Id | information | Stores the object id of the flight information.                        |
| Date      | createdDate | Field to save when the flight was created.                             |

**Coordinates**
Collection that stores the information about the coordinates file that feeds the visualization modules.
| Data Type | Name       | Description                                            |
|-----------|------------|--------------------------------------------------------|
| Object Id | id         | Identifier of the document.                            |
| String    | route      | Field that stores the path of the file in the server.  |
| Date      | updateDate | Field that stores the date when the file was uploaded. |

**Information**
Collection that stores the information about the flight.
| Data Type | Name        | Description                                              |
|-----------|-------------|----------------------------------------------------------|
| Object Id | id          | Identifier of the document.                              |
| Object Id | pilot       | Stores the object id of the pilot of this flight.        |
| Object Id | airplane    | Stores the object id of the airplane used in the flight. |
| String    | title       | Field that contains the title of the flight.             |
| String    | description | Field that contains the description of the flight.       |
| Time      | duration    | Field that contains the duration of the flight.          |
| Date      | date        | Field that contains the date of the flight.              |

**Airplane**
Collection that stores the information about the airplane.
| Data Type | Name     | Description                                      |
|-----------|----------|--------------------------------------------------|
| Object Id | id       | Identifier of the document.                      |
| String    | model    | Field to store the model of the airplane.        |
| String    | number   | Field to store the number of the airplane.       |
| Boolean   | isActive | Field to verify if the airplane is still active. |

## Database Diagram
![DatabaseDiagram](/documentation/database/v1.0.0/design.png)