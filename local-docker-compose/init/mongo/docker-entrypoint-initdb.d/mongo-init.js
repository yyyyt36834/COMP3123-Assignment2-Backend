print('START');

db = db.getSiblingDB('assignment2');

db.createUser(
    {
        user: 'admin',
        pwd:'password',
        roles:[{role:'readWrite', db: 'assignment2'}]
    }
);

db.createCollection('user');

print('END');
