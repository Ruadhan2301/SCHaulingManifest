<template>
  <form>
    <label for="contract-name">Contract Name</label>
    <input type="text" id="contract-name" name="contract-name" />
    <label for="contract-description">Contract Description</label>
    <textarea id="contract-description" name="contract-description"></textarea>
    <label for="contract-amount">Contract Amount</label>
    <input type="number" id="contract-amount" name="contract-amount" />
    <label for="contract-start-date">Contract Start Date</label>
    <input type="date" id="contract-start-date" name="contract-start-date" />
    <label for="contract-end-date">Contract End Date</label>
    <input type="date" id="contract-end-date" name="contract-end-date" />
    <button type="submit">Submit</button>
  </form>
</template>
