---
title: Conditions
---

# Conditions

In Document Designer, we can operate on objects using conditions. It allows us to decide when a particular object or group of objects will be displayed on our label.

For example, we have an object of type Shape. Normally when we put such an object on our design field, it will be visible on the preview. 

![Visible shape](./images/condition-shape-visible.png)

By default, the Condition option in the object's properties is empty. This is an option that works on a true/false basis. When we enter a condition here that returns a false value - the given object will not be shown on the preview. 

![Invisible shape](./images/condition-shape-invisible.png)

###### Group of objects

Of course, the use of this function can be more complicated and complex. First of all, we don't have to perform it on a single object, on the entire Group Band. Here, similarly to the above, the simplest example. First the empty condition (default), only this time already for the GROUP, not for a single OBJECT. The next one, however, with the value false.

![Group of objects](./images/condition-group-of-objects.png)


###### Possible case

In a more natural example, we want a given Group Band to display if,  country code for sender = "GBR". 

![Ship from country code](./images/ship-from-country-code.png)