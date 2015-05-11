/*jslint indent: 2, unparam: true*/
/*global $: false, document: false, togglbutton: false*/
'use strict';

togglbutton.render('body.controller-issues.action-show #content > h2:not(.toggl)', {}, function (elem) {
  var link, description,
    numElem = $('#content > h2'),
    titleElem = $('.subject h3'),
    projectElem = $('h1');

  description = titleElem.innerText;
  if (numElem !== null) {
    description = numElem.innerText + " " + description;
  }

  // Allow of doubleclick to select the issue number.
  numElem.textContent += ' ';

  link = togglbutton.createTimerLink({
    className: 'redmine',
    description: description,
    projectName: projectElem && projectElem.textContent.split(" » ").pop()
  });
  link.style.position = 'fixed';
  link.style.top = 0;
  link.style.left = '50%';
  link.style.border = '1px #ccc solid';
  link.style.fontSize = '13px';
  link.style.setProperty('background-color', '#eee', 'important');

  numElem.appendChild(link);

  var done = createTag('button', '', 'Done');
  numElem.appendChild(done);
  done.title = 'Tâche faite, assigne le statut À tester.';
  done.style.position = 'fixed';
  done.style.right = '50%';
  done.style.top = '4px';
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
