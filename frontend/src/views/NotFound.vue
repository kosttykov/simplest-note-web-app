<template>
    <center>
        <h1>Not Found</h1>
        <a href="/">Go home?</a>
    </center>
</template>
  
<script>

export default {
    name: 'NotFound'
}

</script>
  
<style scoped>
center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h1 {
    color: #dbdddf;
    font-size: 2em;
    margin: 10px;
}

a {
    color: #dbdddf;
}
</style>