<template>
    <form @submit.prevent="submitForm">
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" v.model.trim="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" v.model.trim="password">
        </div>
        <button>Submit</button>
    </form>
</template>