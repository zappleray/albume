const request = require('supertest');
const app = require('../src/app'); 

describe('API Routes', () => {
    it('should get all albums', async () => {
        const response = await request(app).get('/api/albums');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/); // Ensure the response is JSON
        expect(response.body).toBeInstanceOf(Array); // Ensure the response body is an array
        expect(response.body.length).toBeGreaterThan(0); // Ensure the array is not empty
        expect(response.body[0]).toHaveProperty('id'); // Ensure the objects in the array have the expected properties
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('artist');
        expect(response.body[0]).toHaveProperty('year');
        expect(response.body[0]).toHaveProperty('cover');
        expect(response.body[0]).toHaveProperty('description');
        expect(response.body[0]).toHaveProperty('comments');
    });

    it('should get a specific album by ID', async () => {
        const albumId = 1; // Use an existing album ID
        const response = await request(app).get(`/api/albums/${albumId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', albumId);
    });

    it('should return 404 for a non-existent album', async () => {
        const albumId = 999; // Use a non-existent album ID
        const response = await request(app).get(`/api/albums/${albumId}`);
        expect(response.status).toBe(404);
    });

    it('should add a new album', async () => {
        const newAlbum = {
            id: '',
            name: 'Test Album',
            artist: 'Test Artist',
            year: '2023',
            cover: 'images/placeholder-album-cover.jpg',
            description: 'Test description',
            comments: []
        };
        const response = await request(app)
            .post('/api/submit-album')
            .send(newAlbum)
            //.set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Album added successfully');
    });

    it('should add a comment to an album', async () => {
        const albumId = 1; // Use an existing album ID
        const newComment = {
            user: 'Test User',
            comment: 'Test comment'
        };
        const response = await request(app)
            .post(`/api/albums/${albumId}/comments`)
            .send(newComment)
            //.set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Comment added successfully');
    });
});