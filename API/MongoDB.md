# MongoDB

Baza „dokumentowa”

- Baza (tak jak w bazach relacyjnych)
- Kolekcja (odpowiednik „tabeli”)
- Dokument (elastyczne pojęcie podobne do „rekordu”)

Ważna różnica – brak narzuconej „struktury” dokumentów w ramach kolekcji

# MongoDB i Docker

Aby pobrać obraz najnowszej wersji serwera MongoDB i uruchomić bazujący na nim kontener należy wykonać następujące polecenie:


```s
docker container run --name mongodb -d -p 27017-27019:27017-27019 mongo:4.4.9
```

Aby zatrzymać kontener można użyć interfejsu __Docker Desktop__ bądź z poziomy terminala wydać polecenie

```s
docker container stop mongodb
```

Do ponownego uruchomienia skorzystaj z __Docker Desktop__ lub polecenia:

```s
docker container start mongodb
```

# Interfejs graficzny Robo 3T

__Robo 3T__ to wygodny, darmowy interfejs graficzny do __MongoDB__. Można go pobrać ze strony

[Robo 3T](https://robomongo.org/)

# Przykładowe zapytania z wykładu

```javascript
    db.getCollection('kolekcja').find({"title" : "MongoDB Overview", "likes": 100})
```

```javascript
    db.getCollection('kolekcja').find({
        $and: [
            {"title" : "MongoDB Overview"},
            {"likes": 100}
        ]
    })
```

```javascript
    db.getCollection('kolekcja').find({
        $or: [
            { $lte: {"age": 20}},
            { $gt: {"likes" : 90}}
        ]
    })
```

# MongoDB i Node.js

[mongoose](https://mongoosejs.com/)

## Mongoose ([dokumentacja](https://mongoosejs.com/docs/))

Najważniejsze pojęcia:

- __Schemat__ (ang. _Schema_) – „kształt dokumentów”
- __Model__ – struktura, która odpowiada konkretnemu schematowi
- __dokument__ oparty o model

__Uwaga!__ Na każdym z powyższych poziomów możemy mieć do czynienia z _metodami_.
