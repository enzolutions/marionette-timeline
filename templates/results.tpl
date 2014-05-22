<div id="container">
<% _.each(items, function(item){ %>
  <div class="item">
    <div><a target="_blank" href="<%= item.link %>"><img src="<%= item.thumb %>"/></a></div>

    <div><a target="_blank" href="<%= item.link %>">
      <%= item.title.length > 40 ? item.title.slice(0, 40).concat('...') : item.title %>
    </div>
    <div><p><%= item.created.slice(0, 10) %></p></div>
  </div>
<% }); %>
</div>
