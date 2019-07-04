var searchForm = document.querySelector('#searchForm'),
    moviesBlock = document.querySelector('#movies'),
    imageBasePath = 'https://image.tmdb.org/t/p/w500/';

function apiSearch(e) {
    e.preventDefault(); 

    var searchText = document.querySelector('#searchText').value;
    if (searchText.trim().length === 0) {
        moviesBlock.innerHTML = '<h2 class="col-12 text-center text-danger">Поле поиска не должно быть пустым</h2>';
        return;
    }

    var serverApi = 'https://api.themoviedb.org/3/search/multi?api_key=e69178e372334713d726e85acef8b97d&language=ru-RU&query=' + searchText;

    moviesBlock.innerHTML = '<div class="spinner-border"></div>';

    fetch(serverApi)
        .then(function (response) {
            if (response.status !== 200) {
                return Promise.reject(response);
            }

            return response.json();
        })
        .then(function (output) {
            var inner = '';
            if (output.results.length === 0) {
                inner = '<h2 class="col-12 text-center text-info">По Вашему запросу не обнаружено ни единой записи</h2>';
            }
            output.results.forEach(function (item) {
                var nameItem = item.name || item.title,
                    releaseDateDate = new Date(Date.parse(item.first_air_date || item.release_date)),
                    releaseDateText = (!isNaN(releaseDateDate.getDate())) ?
                        ('0' + releaseDateDate.getDate()).slice(-2)
                        + '.'
                        + ('0' + (releaseDateDate.getMonth() + 1)).slice(-2)
                        + '.'
                        + releaseDateDate.getFullYear()
                        : '\<дата не указана\>'
                    ;

                var poster = item.poster_path ? imageBasePath + item.poster_path : './images/non_image.jpg';

                var dataInfo = '';
                if (item.media_type !== 'person')
                    dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;

                inner += `<div class="col-6 col-lg-3 col-sm-4 color-box">
                    <div class="movies-box"  ${dataInfo}>
                        <h3>${nameItem}</h3>
                        <p class="movies__date-text text-center" >
                            ${releaseDateText}
                        </p>
                        <img src="${poster}" alt="${nameItem}" class="movies__preview_image" onerror="this.src = './images/non_image.jpg'">
                    </div>
                </div>`;
            });
            moviesBlock.innerHTML = inner;
            addEventMedia();
        })
        .catch(function (reason) {
            console.error('error: ' + reason.status);
            moviesBlock.innerHTML = '<h2 class="col-12 text-center text-danger">Не удалось получить данные от сервера по Вашему запросу. Попробуйте другой запрос.</h2>';
        });
}

searchForm.addEventListener('submit', apiSearch);

//Добавляем обработчик, чтобы при нажатии на изображение вызывалась функцию открытия полной информации
function addEventMedia() {
    var elements = moviesBlock.querySelectorAll('.movies-box[data-id]');
    elements.forEach(function (element) {
        element.style.cursor = 'pointer';
        element.addEventListener('click', showFullInfo);
    });
}

//Функция открытия полной информации о фильме или сериале
function showFullInfo() {
    var elementType = this.dataset.type,
        elementId = this.dataset.id;
    var url = '';
    if (elementType === 'movie') {
        url = 'https://api.themoviedb.org/3/movie/' + elementId + '?api_key=e69178e372334713d726e85acef8b97d&language=ru-RU';
    }
    else if (elementType === 'tv') {
        url = 'https://api.themoviedb.org/3/tv/' + elementId + '?api_key=e69178e372334713d726e85acef8b97d&language=ru-RU';
    }
    else {
        moviesBlock.innerHTML = '<h2 class="col-12 text-center text-danger">Произошла ошибка обработки запроса</h2>';
        return;
    }

    fetch(url)
        .then(function (value) {
            if (value.status !== 200) {
                return Promise.reject(value);
            }

            return value.json();
        })
        .then(function (output) {
            var nameItem = output.name || output.title,
                releaseDateDate = new Date(Date.parse(output.first_air_date || output.release_date)),
                releaseDateText = (!isNaN(releaseDateDate.getDate())) ?
                    ('0' + releaseDateDate.getDate()).slice(-2)
                    + '.'
                    + ('0' + (releaseDateDate.getMonth() + 1)).slice(-2)
                    + '.'
                    + releaseDateDate.getFullYear()
                    : '\<дата не указана\>'
                ;

            var genres = '';

            output.genres.forEach(function (genresValue) {
                genres += genresValue.name + ' ';
            });

            var poster = output.poster_path ? imageBasePath + output.poster_path : './images/non_image.jpg';

            var dataInfo = '';
            if (output.media_type !== 'person')
                dataInfo = `data-id="${output.id}" data-type="${output.media_type}"`;

            var inner = '<div class="full-element row">';
            inner += `
                    <h4 class="col-12 text-center text-info">${nameItem}</h4>
                    <div class="row movies-box">
                        <div class="col-4">
                            <img src="${poster}" alt="${nameItem}" class="movies__preview_image" onerror="this.src = './images/non_image.jpg'" ${dataInfo}>
                        </div>
                        <div class="col-8">
                            ${output.homepage ? `<p><a href="${output.homepage}" target="_blank" title="Официальная страница">Официальная страница</a> </p>` : ''}
                            
                            ${output.imdb_id ? `<p><a href="https://imdb.com/title/${output.imdb_id}" target="_blank" title="Страница на IMDB.com">Страница на IMDB.com</a> </p>` : ''}
                        
                            <p>Рейтинг: 
                                <span class="movies__date-text">
                                    ${output.vote_average}
                                </span>
                            </p>
                            
                            <p>Статус: 
                                <span class="movies__date-text">
                                    ${output.status}
                                </span>
                            </p>
                            
                            <p>Жанры: 
                                <span class="movies__date-text">
                                    ${genres}
                                </span>
                            </p>
                            
                            <p>Премьера: 
                                <span class="movies__date-text">
                                    ${releaseDateText}
                                </span>
                            </p>
                            
                            ${output.last_episode_to_air ? `<p>
                                <span class="movies__date-text">
                                    ${output.number_of_seasons}
                                </span>
                                &nbsp;сезон 
                                <span class="movies__date-text">
                                    ${output.last_episode_to_air.episode_number}
                                </span>
                                &nbsp;серий вышло
                            </p>` : ''}
                            
                            <div class="movies__description">
                                ${output.overview || '\\<Описание не приложено\\>'}
                            </div>
                            
                            <br>
                            <div class="youtube"></div>
                        </div>
                    </div>`;
            inner += '</div>';

            moviesBlock.innerHTML = inner;
            getVideo(elementType, elementId);
        })
        .catch(function (reason) {
            console.error('error: ' + reason.status);
            moviesBlock.innerHTML = '<h2 class="col-12 text-center text-danger">Не удалось получить данные от сервера по Вашему запросу. Попробуйте другой запрос.</h2>';
        });
}

//Вывод трендов
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=e69178e372334713d726e85acef8b97d&language=ru-RU')
        .then(function (value) {
            if (value.status !== 200) {
                return Promise.reject(value);
            }

            return value.json();
        })
        .then(function (output) {
            var inner = '<h4 class="col-12 text-center text-info">Популярные за неделю!</h4>';
            if (output.results.length === 0) {
                inner = '<h2 class="col-12 text-center text-info">По Вашему запросу не обнаружено ни единой записи</h2>';
            }
            output.results.forEach(function (item) {
                var nameItem = item.name || item.title,
                    releaseDateDate = new Date(Date.parse(item.first_air_date || item.release_date)),
                    releaseDateText = (!isNaN(releaseDateDate.getDate())) ?
                        ('0' + releaseDateDate.getDate()).slice(-2)
                        + '.'
                        + ('0' + (releaseDateDate.getMonth() + 1)).slice(-2)
                        + '.'
                        + releaseDateDate.getFullYear()
                        : '\<дата не указана\>'
                    ;

                var poster = item.poster_path ? imageBasePath + item.poster_path : './images/non_image.jpg';
                var mediaType = item.title ? 'movie' : 'tv',
                    dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;

                inner += `<div class="col-6 col-lg-3 col-sm-4 color-box">
                    <div class="movies-box"  ${dataInfo}>
                        <h3>${nameItem}</h3>
                        <p class="movies__date-text text-center">
                            ${releaseDateText}
                        </p>
                        <img src="${poster}" alt="${nameItem}" class="movies__preview_image" onerror="this.src = './images/non_image.jpg'">
                    </div>
                </div>`;

            });
            moviesBlock.innerHTML = inner;
            addEventMedia();
        })
        .catch(function (reason) {
            console.error('error: ' + reason.status);
            moviesBlock.innerHTML = '<h2 class="col-12 text-center text-danger">Не удалось получить данные от сервера по Вашему запросу. Попробуйте другой запрос.</h2>';
        });
});

//Вывод Youtube видео
function getVideo(type, id) {
    var youtube = moviesBlock.querySelector('.youtube');

    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=e69178e372334713d726e85acef8b97d&language=ru-RU`)
        .then(function (value) {
            if (value.status !== 200) {
                return Promise.reject(value);
            }

            return value.json();
        })
        .then(function (output) {
            var videoIframe = `<h5 class="text-info">Трейлеры на русском</h5>`;
            if (output.results.length === 0)
                videoIframe = `<p class="text-danger">К сожалению видео отсутствует!</p>`;

            output.results.forEach(function (items) {
                videoIframe += '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + items.key + '" frameborder="0" allow="accelerometer; encryped-media; gyroscope; picture-in-picture" ></iframe>';
            });
            youtube.innerHTML = videoIframe;
        })
        .catch(function (reason) {
            console.error('error: ' + reason.status);
            youtube.innerHTML = '<h2 class="col-12 text-center text-danger">Видео отсутствует.</h2>';
        });
    ;
}