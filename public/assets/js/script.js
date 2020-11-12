//get the dogs right at the start
getDogs();

//click listener for the add button
$("#add").click(async function (e) {
    e.preventDefault();

    const newDogName = $("#dogName").val();
    $("#dogName").val("")

    const newDog = {
        name: newDogName
    }

    await $.post("/api/dogs", newDog);

    $("#yourDogs").html("")
    $("#dogLoader").removeClass("hide");

    getDogs();
});

//get all dogs from database
async function getDogs() {
    //async await for cleaner code
    const dogs = await $.get("/api/dogs");

    setTimeout(function () {
        console.log(dogs);

        $("#dogLoader").addClass("hide");

        //loop through the arr
        dogs.forEach(dog => {
            const dogEntry = $(`
        <tr>
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

//updating when the dog is fed
$(document).on("click", ".fed", function () {
    const rightNow = new Date().toLocaleString();
    const dogId = $(this).attr("dogId");

    $.ajax({
        method: "PUT",
        url: "/api/dogs",
        data: { id: dogId, lastFed: rightNow }
    }).then(function () {
        $("#yourDogs").html("")
        $("#dogLoader").removeClass("hide");
        getDogs();
    })
})
