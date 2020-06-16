// Product Information Component
Vue.component ('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            
        <div class="product-image">
            <img v-bind:src="image" 
            v-bind:alt="altText" 
            >
        </div>

        <div class="product-info">

            <h1>{{ title }}</h1>
            <p>Shipping: {{shipping}}</p> 
            <p
            :class="{ productOutOfStock: inStock }"
            >
            Out of Stock</p>

            <p>{{ description }}</p>

            <div class="product-deal">
                <span v-if="onSale">ON SALE!</span>
                <span v-else>normal</span>
            </div>
    

            <ul>
            <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)"
                >
            </div>
       
            <button v-on:click="addToCart" 
            :disabled="!inStock" 
            :class="{ disabledButton: !inStock}"
            >
            Add to Cart</button>
            

        </div>

    </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            description: 'A pair of warm, fuzzy socks',
            selectedVariant: 0,
        //   image: './assets/vmSocks-green-onWhite.jpg',
            altText: 'image of green socks',
            onSale: true,
            details: ["80% Cotton", "20% Polyester", "Unisex"],
            variants: [
            {
                variantId: 44,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green-onWhite.jpg',
                variantQuantity: 10
            },
            {
                variantId: 45,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue-onWhite.png',
                variantQuantity: 0
            }
            ]
        }
    },
    methods: {
        addToCart: function () {
          console.log("add to cart in product");
          console.log("product this.selected variant: " + this.selectedVariant);
          console.log("product id to emit: " + this.variants[this.selectedVariant].variantId);
          
          this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId );
        },
        removeFromCart: function () {
          console.log("remove product");
          this.cart -= 1
        },
        updateProduct(index) {
            console.log("update product - index: " + index);
            console.log("prod quantity = " + this.variants[this.selectedVariant].variantQuantity);
            this.selectedVariant = index
        }
    },
    computed: {
        // computed items are cached
        title () {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        hotDeal() {
            if (this.onSale) {
                return this.brand + " " + this.product
            } else {
            return "No Deal!"
            }
        },
        shipping() {
                if (this.premium) {
                    return "FREE"
                } else {
                    return 2.99
                }
            }
        
    }
})

  // PRODUCT REVIEW COMPONENT
Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    
    <p v-if="errors.lenght">
        <b>Please correct the following error(s):</b>
        <ul v-for="error in errors">
            <li>{{error}}</li>
        </ul>
    </p>
    
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review" placeholder="Review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option value="" selected disabled hidden>Choose here</option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
    </p>

    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data() {
        return {
          name: null,
          review: null,
          rating: null,
          errors: [],
          recommend: null
        }
      },
    methods: {
        onSubmit() {
            if ( this.name && this.review && this.rating) {
                
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                  }
                  this.$emit('review-submitted', productReview)
                  this.name = null
                  this.review = null
                  this.rating = null
                
            } else {
                if ( !this.name ) { this.errors.push("Name required")
                }
                if ( !this.review ) { this.errors.push("Review required")
                }
                if ( !this.rating ) { this.errors.push("Rating required")
                }
            }                   
        }
    }
})

Vue.component('product-tabs', {
    template: `
    <div>
        <span class="tabs"
            v-for="(tab, index) in tabs" :key="index"
            {{tab}}></span>
        </div>
    `,
    data () {
        return {
            tabs: ['Reviews', 'Make a Review', 'Details', 'Shipping']
        }
    }
})

// THE APP INSTANCE - ROOT
var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
        reviewList: []
    },
    methods: {
        updateCart(id) {
            console.log("add to cart Vue instance");
            this.cart.push(id);
        },
        addReview(productReview) {
            console.log(this.reviewList)

            this.reviewList.push(productReview)
            
        }
    }
  })