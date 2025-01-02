# albume

# Retrieve Albums - Endpoint: `GET /api/albums`

This endpoint retrieves a list of albums.

---

## Request

- **No request body is required** for this endpoint.

---

## Response

The response will be a JSON array containing album objects with the following properties:

### Properties

| Property       | Type     | Description                                                                 |
|----------------|----------|-----------------------------------------------------------------------------|
| `id`           | Integer  | The unique identifier of the album.                                        |
| `name`         | String   | The name of the album.                                                     |
| `artist`       | String   | The name of the artist or band.                                            |
| `year`         | String   | The release year of the album.                                             |
| `cover`        | String   | URL or path to the album cover image.                                      |
| `description`  | String   | Description of the album.                                                  |
| `comments`     | Array    | An array of comment objects.                                               |

### `comments` Array Properties

| Property       | Type     | Description                                                                 |
|----------------|----------|-----------------------------------------------------------------------------|
| `user`         | String   | The user who made the comment.                                             |
| `comment`      | String   | The comment made by the user.                                              |

---

## Example JSON response

```json
[
    {
        "id": 1,
        "name": "Meddle",
        "artist": "Pink Floyd",
        "year": "1971",
        "cover": "images/meddle.jpeg",
        "description": "Meddle is the sixth studio album by English rock band Pink Floyd, released on 31 October 1971 by Harvest Records. The album was produced between the band's touring commitments, from January to August 1971 at a series of locations around London, including Abbey Road Studios and Morgan Studios.",
        "comments": [
            {
                "user": "John Doe",
                "comment": "Love getting totally baked to this dude!"
            },
            {
                "user": "Jane Smith",
                "comment": "A masterpiece."
            },
            {
                "user": "Anonymous",
                "comment": "This shit is fire"
            },
            {
                "user": "Anonymous",
                "comment": "Legendary"
            },
            {
                "user": "Anonymous",
                "comment": "Cool"
            },
            {
                "user": "Oscar",
                "comment": "Good with acid"
            }
        ]
    },
    {
        "id": 2,
        "name": "You",
        "artist": "Gong",
        "year": "1974",
        "cover": "images/you.jpg",
        "description": "You is the fifth studio album by the progressive rock band Gong, released by Virgin Records in October 1974. It is the last album by Daevid Allen's Gong until 1992's Shapeshifter. Recorded at Virgin's Manor Studios in Oxfordshire, England, side 1 was mixed at Pye Studios, Marble Arch, London, while side 2 was mixed at The Manor.",
        "comments": [
            {
                "user": "Alice Cooper",
                "comment": "A psychedelic journey!"
            },
            {
                "user": "Bob Marley",
                "comment": "Great vibes and energy."
            },
            {
                "user": "Anonymous",
                "comment": "This is mad."
            },
            {
                "user": "Anonymous",
                "comment": "yo"
            }
        ]
    }
]

```

# Retrieve Specific Album - Endpoint: `GET /api/albums/:id`

This endpoint retrieves information about a specific album based on the provided ID.

---

## Request

- **Parameter**: The `id` parameter in the URL should be a **positive integer**.

---

## Response

### Status

- **200 OK**

### Content-Type

- `application/json`

---

### Response Body

The response will be a JSON object with the following structure:

| Property       | Type     | Description                                                                 |
|----------------|----------|-----------------------------------------------------------------------------|
| `id`           | Integer  | The ID of the album.                                                       |
| `name`         | String   | The name of the album.                                                     |
| `artist`       | String   | The name of the artist or band.                                            |
| `year`         | String   | The release year of the album.                                             |
| `cover`        | String   | URL or path to the album cover image.                                      |
| `description`  | String   | Description or details about the album.                                    |
| `comments`     | Array    | An array of comments associated with the album.                            |

### `comments` Array Properties

| Property       | Type     | Description                                                                 |
|----------------|----------|-----------------------------------------------------------------------------|
| `user`         | String   | The name of the user who made the comment.                                 |
| `comment`      | String   | The comment made by the user.                                              |

---

## Example JSON Response

```json
{
    "id": 4,
    "name": "Led Zeppelin IV",
    "artist": "Led Zeppelin",
    "year": "1971",
    "cover": "images/led-zeppelin-iv.jpg",
    "description": "Led Zeppelin IV is the fourth studio album by the English rock band Led Zeppelin. It was released on 8 November 1971 by Atlantic Records. The album was produced by guitarist Jimmy Page and recorded between December 1970 and February 1971, largely in a remote house in Wales called Bron-Yr-Aur.",
    "comments": [
      {
        "user": "Jimmy Page",
        "comment": "One of our best works!"
      },
      {
        "user": "Robert Plant",
        "comment": "Timeless and powerful."
      }
    ]
  }
  ```
## Add Comment to Album - Endpoint: `POST /api/albums/:id/comments`

This endpoint allows the user to add a comment to a specific album.

---

### Request
#### **Parameter**: The `id` parameter in the URL should be a **positive integer**.
#### Body:
```json
{
    "user": "test_user",
    "comment": "test_comment"
}
```

### Response
- **Status:** `200`
- **Content-Type:** `text/html`

The response indicates the success of adding the comment to the album.

## Add new Album - Endpoint: `POST /api/submit-album`

This endpoint allows you to submit a new album.

---

### Request
- **Method**: POST
- **Headers**:
  - `Content-Type`: application/json
- **Body**:

| Property       | Type     | Description                                                                 |
|----------------|----------|-----------------------------------------------------------------------------|
| `id`           | Integer  | The ID of the album.                                                       |
| `name`         | String   | The name of the album.                                                     |
| `artist`       | String   | The name of the artist or band.                                            |
| `year`         | String   | The release year of the album.                                             |
| `cover`        | String   | URL or path to the album cover image.                                      |
| `description`  | String   | Description or details about the album.                                    |
| `comments`     | Array    | An array of comments associated with the album.                            |

---
 
### Response
- Status: 200
- Content-Type: text/html
- Body: Album succesfully added

