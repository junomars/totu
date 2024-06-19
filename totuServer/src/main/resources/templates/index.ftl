<#-- @ftlvariable name="boards" type="kotlin.collections.List<space.junodev.totuServer.model.Board>" -->
<#import "_layout.ftl" as layout />
<@layout.header>
    <#list boards?reverse as board>
        <div>
            <h3>
                <a href="/boards/${board.id}">${board.name}</a>
            </h3>
            <p>
                ${board.nodes}
            </p>
            <p>
                ${board.edges}
            </p>
        </div>
    </#list>
</@layout.header>