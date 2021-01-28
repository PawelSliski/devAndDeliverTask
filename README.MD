**Dev and deliver node.js recruitment task**
----
  
  User registration

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  `{email: string, password: string}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
        user: {
            email: string,
            password: string,
            heroId: number,
        };
        token: string
    }`

----
  
  User login

* **URL**

  /auth/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  `{email: string, password: string}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
        user: {
            email: string,
            password: string,
            heroId: number,
        };
        token: string
    }`

----
  
  Get user films

* **URL**

  /films

* **Method:**

  `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        title: string,
        episode_id: number,
        opening_crawl: string,
        director: string,
        producer: string,
        release_date: string,
        characters: string[] | [],
        planets: string[] | [],
        starships: string[] | [],
        starships: string[] | [],
        species: string[] | [],
        created: string,
        edited: string,
        url: string,
    }[]
    
    OR []

* **Failure Response:**

    * **Code:** 401 <br />
    **Content:** `{
    "statusCode": 401,
    "message": "Unauthorized"
    }`

----

  Get film by id

* **URL**

  /films/:filmId

* **Method:**

  `GET`
  
*  **URL Params**

    filmId: number

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        title: string,
        episode_id: number,
        opening_crawl: string,
        director: string,
        producer: string,
        release_date: string,
        characters: string[] | [],
        planets: string[] | [],
        starships: string[] | [],
        starships: string[] | [],
        species: string[] | [],
        created: string,
        edited: string,
        url: string,
    }

* **Failure Response:**

    * **Code:** 401 <br />
    **Content:** `{
    "statusCode": 401,
    "message": "Unauthorized"
    }`

    OR

    * **Code:** 401 <br />
    **Content:** `{
    "response": {
        "statusCode": 401,
        "message": "No access to selected films",
        "error": "Unauthorized"
        },
    "status": 401,
    "message": "No access to selected films"
    }

----
  
  Get user species

* **URL**

  /species

* **Method:**

  `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        name: string,
        classification: string,
        designation: string,
        average_height: number,
        skin_colors: string,
        hair_colors: string,
        eye_colors: string,
        average_lifespan: string,
        homeworld: string,
        language: string,
        people: string[] | [],
        films: string[] | [],
        created: string,
        edited: string,
        url: string,
    }[]
    
    OR []

* **Failure Response:**

    * **Code:** 401 <br />
    **Content:** `{
    "statusCode": 401,
    "message": "Unauthorized"
    }`

----

  Get species by id

* **URL**

  /species/:speciesId

* **Method:**

  `GET`
  
*  **URL Params**

    speciesId: number

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        name: string,
        classification: string,
        designation: string,
        average_height: number,
        skin_colors: string,
        hair_colors: string,
        eye_colors: string,
        average_lifespan: string,
        homeworld: string,
        language: string,
        people: string[] | [],
        films: string[] | [],
        created: string,
        edited: string,
        url: string,
    }

* **Failure Response:**

    * **Code:** 401 <br />
    **Content:** `{
    "statusCode": 401,
    "message": "Unauthorized"
    }`

    OR

    * **Code:** 401 <br />
    **Content:** `{
    "response": {
        "statusCode": 401,
        "message": "No access to selected species",
        "error": "Unauthorized"
        },
    "status": 401,
    "message": "No access to selected species"
    }

----
  
  Get user starships

* **URL**

  /starships

* **Method:**

  `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        name: string, 
        model: string, 
        manufacturer: string,
        cost_in_credits: string,
        length: string,
        max_atmosphering_speed: string,
        crew: string,
        passengers: string,
        cargo_capacity: string,
        consumables: string,
        hyperdrive_rating: string,
        MGLT: string,
        starship_class: string,
        pilots: string[] | [], 
        films: string[] | [],
        created: string,
        edited: string,
        url: string,
    }[]
    
    OR []

* **Failure Response:**

    * **Code:** 401 <br />
    **Content:** `{
    "statusCode": 401,
    "message": "Unauthorized"
    }`

----

  Get starship by id

* **URL**

  /starships/:starshipId

* **Method:**

  `GET`
  
*  **URL Params**

    starshipId: number

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        name: string, 
        model: string, 
        manufacturer: string,
        cost_in_credits: string,
        length: string,
        max_atmosphering_speed: string,
        crew: string,
        passengers: string,
        cargo_capacity: string,
        consumables: string,
        hyperdrive_rating: string,
        MGLT: string,
        starship_class: string,
        pilots: string[] | [], 
        films: string[] | [],
        created: string,
        edited: string,
        url: string,
    }

* **Failure Response:**

    * **Code:** 401 <br />
    **Content:** `{
    "statusCode": 401,
    "message": "Unauthorized"
    }`

    OR

    * **Code:** 401 <br />
    **Content:** `{
    "response": {
        "statusCode": 401,
        "message": "No access to selected starships",
        "error": "Unauthorized"
        },
    "status": 401,
    "message": "No access to selected starships"
    }

----
  
  Get user vehicles

* **URL**

  /vehicles

* **Method:**

  `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        name: string,
        model: string,
        manufacturer: string,
        cost_in_credits: string,
        length: string,
        max_atmosphering_speed: string,
        crew: string,
        passengers: string,
        cargo_capacity: string,
        consumables: string,
        vehicle_class: string,
        pilots: string[] | [],
        films: string[] | [],
        created: string,
        edited: string,
        url: string,
    }[]
    
    OR []

* **Failure Response:**

    * **Code:** 401 <br />
    **Content:** `{
    "statusCode": 401,
    "message": "Unauthorized"
    }`

----

  Get vehicle by id

* **URL**

  /vehicles/:vehicleId

* **Method:**

  `GET`
  
*  **URL Params**

    vehicleId: number

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        name: string,
        model: string,
        manufacturer: string,
        cost_in_credits: string,
        length: string,
        max_atmosphering_speed: string,
        crew: string,
        passengers: string,
        cargo_capacity: string,
        consumables: string,
        vehicle_class: string,
        pilots: string[] | [],
        films: string[] | [],
        created: string,
        edited: string,
        url: string,
    }

* **Failure Response:**

    * **Code:** 401 <br />
    **Content:** `{
    "statusCode": 401,
    "message": "Unauthorized"
    }`

    OR

    * **Code:** 401 <br />
    **Content:** `{
    "response": {
        "statusCode": 401,
        "message": "No access to selected vehicles",
        "error": "Unauthorized"
        },
    "status": 401,
    "message": "No access to selected vehicles"
    }

----
  
  Get user planets

* **URL**

  /planets

* **Method:**

  `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        name: string,
        rotation_period: string,
        orbital_period: string,
        diameter: string,
        climate: string,
        gravity: string,
        terrain: string,
        surface_water: string,
        population: string,
        residents: string[] | [],
        films: string[] | [],
        created: string,
        edited: string,
        url: string,
    }[]
    
    OR []

* **Failure Response:**

    * **Code:** 401 <br />
    **Content:** `{
    "statusCode": 401,
    "message": "Unauthorized"
    }`

----

  Get planet by id

* **URL**

  /planets/:planetId

* **Method:**

  `GET`
  
*  **URL Params**

    planetId: number

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        name: string,
        rotation_period: string,
        orbital_period: string,
        diameter: string,
        climate: string,
        gravity: string,
        terrain: string,
        surface_water: string,
        population: string,
        residents: string[] | [],
        films: string[] | [],
        created: string,
        edited: string,
        url: string,
    }

* **Failure Response:**

    * **Code:** 401 <br />
    **Content:** `{
    "statusCode": 401,
    "message": "Unauthorized"
    }`

    OR

    * **Code:** 401 <br />
    **Content:** `{
    "response": {
        "statusCode": 401,
        "message": "No access to selected planets",
        "error": "Unauthorized"
        },
    "status": 401,
    "message": "No access to selected planets"
    }