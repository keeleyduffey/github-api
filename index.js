'use strict';



function getResults (usernameToFind) {
  const url = `https://api.github.com/users/${usernameToFind}/repos`;

  fetch(url)
  .then(response => response.json())
  .then(responseJSON => displayResults(responseJSON))
  .catch(error => console.log(error));
}


function createList (responses) {
  return responses.map(response => `
    <li><a href="${response.html_url}" target="_blank" > Repo Name: ${response.name}</a></li>`
  );
}


function displayResults (responseJSON) {

  $('#results-list').empty();
  if (responseJSON.length === 0) {
    console.log('here');
    $('#results-list').html(`<ul><li>No results found</li></ul>`);
    $('.results').css('display','block');
  } else {
    const resultsList = createList(responseJSON).join('<br>');
    $('#results-list').html(`<ul>${resultsList}</ul>`);
    $('.results').css('display','block');

  }
}

function submitForm() {
  $('form').submit(event => {
    event.preventDefault();
    const usernameToFind = $('#js-username').val();
    getResults(usernameToFind);
  });
}

$(function() {
  submitForm();
});