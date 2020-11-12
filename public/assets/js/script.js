// get the dogs right at the start
getDogs();

// click listener for the add button
$("#add").click(async function (e) {
    e.preventDefault();

    const newDogName = $("#dogName").val();
    $("#dogName").val("")

    const newDog = {
        name: newDogName
    }

    await $.post("/api/dogs", newDog);

    loader();
});

// get all dogs from database
async function getDogs() {
    // async await for cleaner code
    const dogs = await $.get("/api/dogs");

    setTimeout(function () {
        console.log(dogs);

        $("#dogLoader").addClass("hide");

        // loop through the arr
        dogs.forEach(dog => {
            const dogEntry = $(`
        <tr>
            <td class="deleteButtontd hide">
                <button dogId=${dog.id} class="btn-floating btn waves-effect waves-light delete red">
                    <i class="material-icons right">delete</i>
                </button> 
            </td>
            <td class="petName">${dog.name}</td>
            <td class="centered" >Last Fed: ${dog.lastFed}</td>
            <td>
                <button dogId=${dog.id} class="btn waves-effect waves-light green fed" type="submit">FEED
                    <i class="material-icons right">check</i>
                </button>
            </td>
        </tr>
        `);

            $("#yourDogs").append(dogEntry);
        });
    }, 1200)
};

// updating when the dog is fed
$(document).on("click", ".fed", function () {
    const rightNow = new Date().toLocaleString();
    const dogId = $(this).attr("dogId");

    $.ajax({
        method: "PUT",
        url: "/api/dogs",
        data: { id: dogId, lastFed: rightNow }
    }).then(loader());
});

// deleting a dog from the db
$(document).on("click", ".delete", function () {
    const dogId = $(this).attr("dogId");

    console.log(dogId);

    $.ajax({
        method: "DELETE",
        url: "/api/dogs",
        data: { id: dogId }
    }).then(loader());
});

// a way for the user to feed all the dogs at once
$("#feedAll").click(async function () {
    const dogs = await $.get("/api/dogs");

    const rightNow = new Date().toLocaleString();

    dogs.forEach(dog => {
        $.ajax({
            method: "PUT",
            url: "/api/dogs",
            data: { id: dog.id, lastFed: rightNow }
        }).catch(err => alert(err));
    });

    loader();
});

// handles showing the delete button and hiding it
$("#edit").click(function () {

    // set variable equal to the node list
    const buttonArr = $(".deleteButtontd");

    // loop through the node list and add the desired class names
    for (let i = 0; i < buttonArr.length; i++) {
        // if it has the class showButton then we can hide it otherwise we can hide it :-) 
        buttonArr[i].className.indexOf("showButton") === -1 ?
            buttonArr[i].className = "deleteButtontd showButton"
            : // for kyle, if you're looking at this - it means "or"
            buttonArr[i].className = "deleteButtontd hide";
    }
});

function loader() {
    $("#yourDogs").html("")
    $("#dogLoader").removeClass("hide");
    getDogs();
}
