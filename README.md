# VetApp

You can reach the project at: https://vet-app-batuhanozudogrus-projects.vercel.app

## Description
- This is a simple vet clinic management system that allows the user to create, read, update, and delete data.
- The data is stored in a PostgreSQL database. The API is built using Java Spring Boot and tested using Postman.
- The UI is built using React and Material-UI.

## Built with
- Java Spring Boot
- PostgreSQL
- React
- Material-UI

## Deployed with
- Vercel
- Render

## CRUD Constraints
- There can't be two animals with the same name and owner. (Unique constraint)
- Customers and doctors are unique based on their phone numbers and emails together. (Unique constraint)
- A single doctor is on-call each day.
- A new vaccine can't be created for an animal if that animal has an active protection with that vaccine.
- Appointments are hourly. Appointment start times are always at the beginning of the hour.
- An appointment can't be created if the doctor is not available at that time.
- Reports can be created after each appointment with a one-to-one relationship.
- Cascade delete is enabled for all entities where the remaining data would be irrelevant after deletion. (If a customer is deleted, all of their animals and appointments are deleted as well.)