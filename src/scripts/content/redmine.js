/*jslint indent: 2, unparam: true*/
/*global $: false, document: false, togglbutton: false*/
'use strict';

togglbutton.render('body.controller-issues.action-show h2:not(.toggl)', {}, function (elem) {
  var link, description,
    numElem = $('h2'),
    titleElem = $('.subject h3'),
    projectElem = $('h1');

  description = titleElem.innerText;
  if (numElem !== null) {
    description = numElem.innerText + " " + description;
  }

  link = togglbutton.createTimerLink({
    className: 'redmine',
    description: description,
    projectName: projectElem && projectElem.textContent.split(" » ").pop()
  });

  $('h2').appendChild(link);

  var done = createTag('button', '', 'Done');
  $('h2').appendChild(done);
  done.title = 'Tâche faite, assigne le statut À tester.';
  done.addEventListener('click', function() {
    var uid = $('.author .user').href.replace(/^.+?(\d+)$/, '$1');
    $('.icon.icon-edit').click();
    $('#issue_status_id option[value="6"]').selected = 'selected';// "À tester."
    $('#issue_assigned_to_id option[value="' + uid  +'"]').selected = 'selected';
    $('#issue_done_ratio option[value="100"]').selected = 'selected';
    $('#issue_custom_field_values_23 option[value="Doing"]').selected = 'selected';
    $('#issue_notes').focus();
  });
});
