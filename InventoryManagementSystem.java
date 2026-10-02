import java.util.ArrayList;
import java.util.Scanner;

class Product {
    protected int id;
    protected String name;
    protected double price;
    protected int quantity;

    Product(int id, String name, double price, int quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public double getStockValue() {
        return price * quantity;
    }

    public void display() {
        System.out.println(id + "\t" + name + "\t₹" + price + "\t" + quantity);
    }
}

// Simple inheritance + method overriding
class ElectronicProduct extends Product {
    ElectronicProduct(int id, String name, double price, int quantity) {
        super(id, name, price, quantity);
    }

    @Override
    public void display() {
        System.out.println(id + "\t" + name + " (Electronic)\t₹" + price + "\t" + quantity);
    }
}

class Inventory {
    private ArrayList<Product> products = new ArrayList<>();

    public void addProduct(Product product) {
        products.add(product);
        System.out.println("Product added successfully.");
    }

    public void showProducts() {
        if (products.size() == 0) {
            System.out.println("No products available.");
            return;
        }

        System.out.println("\nID\tProduct\t\tPrice\tQuantity");
        System.out.println("-----------------------------------------------");

        for (Product product : products) {
            product.display(); // Polymorphism
        }
    }

    public void showTotalStockValue() {
        double total = 0;

        for (Product product : products) {
            total = total + product.getStockValue();
        }

        System.out.println("Total stock value: ₹" + total);
    }

    public void purchaseProduct(int id, int requestedQuantity) {
        for (Product product : products) {
            if (product.id == id) {
                if (requestedQuantity <= product.quantity) {
                    double total = product.price * requestedQuantity;
                    product.quantity = product.quantity - requestedQuantity;

                    System.out.println("\nPurchase successful.");
                    System.out.println("Product: " + product.name);
                    System.out.println("Quantity: " + requestedQuantity);
                    System.out.println("Total: ₹" + total);
                } else {
                    System.out.println("Insufficient stock.");
                }
                return;
            }
        }

        System.out.println("Product not found.");
    }
}

public class InventoryManagementSystem {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Inventory inventory = new Inventory();

        int choice;

        do {
            System.out.println("\n===== INVENTORY MANAGEMENT SYSTEM =====");
            System.out.println("1. Add Product");
            System.out.println("2. Display Products");
            System.out.println("3. Show Total Stock Value");
            System.out.println("4. Purchase Product");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter Product ID: ");
                    int id = sc.nextInt();

                    sc.nextLine();
                    System.out.print("Enter Product Name: ");
                    String name = sc.nextLine();

                    System.out.print("Enter Price: ");
                    double price = sc.nextDouble();

                    System.out.print("Enter Quantity: ");
                    int quantity = sc.nextInt();

                    inventory.addProduct(new Product(id, name, price, quantity));
                    break;

                case 2:
                    inventory.showProducts();
                    break;

                case 3:
                    inventory.showTotalStockValue();
                    break;

                case 4:
                    System.out.print("Enter Product ID: ");
                    int purchaseId = sc.nextInt();

                    System.out.print("Enter Quantity: ");
                    int purchaseQuantity = sc.nextInt();

                    inventory.purchaseProduct(purchaseId, purchaseQuantity);
                    break;

                case 5:
                    System.out.println("Exiting program...");
                    break;

                default:
                    System.out.println("Invalid choice.");
            }

        } while (choice != 5);

        sc.close();
    }
}
